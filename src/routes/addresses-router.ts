import { Router, Request, Response } from "express";
import { addressRepository } from "../repositories/address-repository";

export const addressesRouter = Router();

addressesRouter.get("/", (req: Request, res: Response) => {
  const country =
    typeof req.query.country === "string" ? req.query.country : undefined;
  const foundedAddresses = addressRepository.findAddresses(country);
  res.send(foundedAddresses);
});

addressesRouter.post("/", (req: Request, res: Response) => {
  const address = req.body;
  if (address) {
    const newAddress = addressRepository.createAddress(address);
    res.status(201).send(newAddress);
  } else {
    res.sendStatus(400);
  }
});

addressesRouter.get("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const address = addressRepository.findAddressById(id);
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
    const successMessage = addressRepository.updateAddressById(id, body);
    res.status(200).send(successMessage);
  } catch (err) {
    res.sendStatus(400);
  }
});

addressesRouter.delete("/:id", (req: Request, res: Response) => {
  const id = req.params.id;
  const successMessage = addressRepository.deleteAddressById(id);
  if (successMessage) {
    res.send(successMessage);
  } else {
    res.sendStatus(404);
  }
});
