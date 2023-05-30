"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressesRouter = void 0;
const express_1 = require("express");
const address_repository_1 = require("../repositories/address-repository");
exports.addressesRouter = (0, express_1.Router)();
exports.addressesRouter.get("/", (req, res) => {
    const country = typeof req.query.country === "string" ? req.query.country : undefined;
    const foundedAddresses = address_repository_1.addressRepository.findAddresses(country);
    res.send(foundedAddresses);
});
exports.addressesRouter.post("/", (req, res) => {
    const address = req.body;
    if (address) {
        const newAddress = address_repository_1.addressRepository.createAddress(address);
        res.status(201).send(newAddress);
    }
    else {
        res.sendStatus(400);
    }
});
exports.addressesRouter.get("/:id", (req, res) => {
    const id = req.params.id;
    const address = address_repository_1.addressRepository.findAddressById(id);
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
        const successMessage = address_repository_1.addressRepository.updateAddressById(id, body);
        res.status(200).send(successMessage);
    }
    catch (err) {
        res.sendStatus(400);
    }
});
exports.addressesRouter.delete("/:id", (req, res) => {
    const id = req.params.id;
    const successMessage = address_repository_1.addressRepository.deleteAddressById(id);
    if (successMessage) {
        res.send(successMessage);
    }
    else {
        res.sendStatus(404);
    }
});
