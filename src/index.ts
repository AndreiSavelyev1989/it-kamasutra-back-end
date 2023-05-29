import express, { Request, Response } from "express";

import { addressesRouter } from "./routes/addresses-router";

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());


app.use("/addresses", addressesRouter);


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
