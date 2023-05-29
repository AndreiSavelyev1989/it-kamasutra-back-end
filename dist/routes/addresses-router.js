"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const uuid_1 = require("uuid");
exports.addressesRouter = (0, express_1.Router)();
let addresses = [
    { id: "1", country: "Belarus", city: "Mogilev", street: "Zaslonova" },
    { id: "2", country: "England", city: "London", street: "Petric" },
    { id: "3", country: "USA", city: "New York", street: "Pablo" },
    { id: "4", country: "USA", city: "Boston", street: "Peter pen" },
];
exports.addressesRouter.get("/", (req, res) => {
    const country = req.query.country;
    if (country) {
        const filteredAddresses = addresses.filter((el) => el.country === country);
        res.send(filteredAddresses);
    }
    res.send(addresses);
});
exports.addressesRouter.post("/", (req, res) => {
    const address = req.body;
    if (address) {
        const id = (0, uuid_1.v4)();
        const newAddress = Object.assign(Object.assign({}, address), { id });
        addresses.push(newAddress);
        res.status(201).send(newAddress);
    }
    else {
        res.sendStatus(400);
    }
});
exports.addressesRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const address = addresses.find((el) => el.id === id);
    if (address) {
        res.send(address);
    }
    else {
        res.sendStatus(404);
    }
});
exports.addressesRouter.put("/:id", (req, res) => {
    try {
        const id = req.params.id;
        const body = req.body;
        addresses = addresses.map((el) => {
            if (el.id === id) {
                return Object.assign(Object.assign({}, el), body);
            }
            else {
                return el;
            }
        });
        res.status(200).send(`Address with id: ${id} successfully updated`);
    }
    catch (err) {
        res.sendStatus(400);
    }
});
exports.addressesRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    addresses = addresses.filter((el) => el.id !== id);
    if (addresses) {
        res.send(`Address with id: ${id} was successfully deleted!`);
        res.sendStatus(204);
    }
    else {
        res.sendStatus(404);
    }
});
