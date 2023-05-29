import { Router, Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";

export const addressesRouter = Router();

let addresses = [
  { id: "1", country: "Belarus", city: "Mogilev", street: "Zaslonova" },
  { id: "2", country: "England", city: "London", street: "Petric" },
  { id: "3", country: "USA", city: "New York", street: "Pablo" },
  { id: "4", country: "USA", city: "Boston", street: "Peter pen" },
];

addressesRouter.get("/", (req: Request, res: Response) => {
  const country = req.query.country;
  if (country) {
    const filteredAddresses = addresses.filter((el) => el.country === country);
    res.send(filteredAddresses);
  }
  res.send(addresses);
});

addressesRouter.post("/", (req: Request, res: Response) => {
  const address = req.body;
  if (address) {
    const id = uuidv4();
    const newAddress = { ...address, id };
    addresses.push(newAddress);
    res.status(201).send(newAddress);
  } else {
    res.sendStatus(400);
  }
});

addressesRouter.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const address = addresses.find((el) => el.id === id);
  if (address) {
    res.send(address);
  } else {
    res.sendStatus(404);
  }
});

addressesRouter.put("/:id", (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body = req.body;
    addresses = addresses.map((el) => {
      if (el.id === id) {
        return { ...el, ...body };
      } else {
        return el;
      }
    });
    res.status(200).send(`Address with id: ${id} successfully updated`);
  } catch (err) {
    res.sendStatus(400);
  }
});

addressesRouter.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  addresses = addresses.filter((el) => el.id !== id);
  if (addresses) {
    res.send(`Address with id: ${id} was successfully deleted!`);
    res.sendStatus(204);
  } else {
    res.sendStatus(404);
  }
});
