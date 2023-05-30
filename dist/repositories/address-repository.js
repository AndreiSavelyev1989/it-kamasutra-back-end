"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addressRepository = void 0;
const uuid_1 = require("uuid");
let addresses = [
    { id: "1", country: "Belarus", city: "Mogilev", street: "Zaslonova" },
    { id: "2", country: "England", city: "London", street: "Petric" },
    { id: "3", country: "USA", city: "New York", street: "Pablo" },
    { id: "4", country: "USA", city: "Boston", street: "Peter pen" },
];
exports.addressRepository = {
    findAddresses: (country) => {
        if (country) {
            const filteredAddresses = addresses.filter((el) => el.country === country);
            return filteredAddresses;
        }
        return addresses;
    },
    createAddress: (body) => {
        const id = (0, uuid_1.v4)();
        const newAddress = Object.assign(Object.assign({}, body), { id });
        addresses.push(newAddress);
        return newAddress;
    },
    findAddressById: (id) => {
        return addresses.find((el) => el.id === id);
    },
    updateAddressById: (id, body) => {
        addresses = addresses.map((el) => {
            if (el.id === id) {
                return Object.assign(Object.assign({}, el), body);
            }
            else {
                return el;
            }
        });
        return `Address with id: ${id} successfully updated`;
    },
    deleteAddressById: (id) => {
        addresses = addresses.filter((el) => el.id !== id);
        return `Address with id: ${id} was successfully deleted!`;
    },
};
