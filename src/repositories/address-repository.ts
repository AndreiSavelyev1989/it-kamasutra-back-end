import { v4 as uuidv4 } from "uuid";
import { Address, AddressForUpdate } from "../types/types";

let addresses = [
  { id: "1", country: "Belarus", city: "Mogilev", street: "Zaslonova" },
  { id: "2", country: "England", city: "London", street: "Petric" },
  { id: "3", country: "USA", city: "New York", street: "Pablo" },
  { id: "4", country: "USA", city: "Boston", street: "Peter pen" },
];

export const addressRepository = {
  findAddresses: (country: string | undefined) => {
    if (country) {
      const filteredAddresses = addresses.filter(
        (el) => el.country === country
      );
      return filteredAddresses;
    }
    return addresses;
  },

  createAddress: (body: Address) => {
    const id = uuidv4();
    const newAddress = { ...body, id };
    addresses.push(newAddress);
    return newAddress;
  },

  findAddressById: (id: string) => {
    return addresses.find((el) => el.id === id);
  },

  updateAddressById: (id: string, body: AddressForUpdate) => {
    addresses = addresses.map((el) => {
      if (el.id === id) {
        return { ...el, ...body };
      } else {
        return el;
      }
    });
    return `Address with id: ${id} successfully updated`;
  },

  deleteAddressById: (id: string) => {
    addresses = addresses.filter((el) => el.id !== id);
    return `Address with id: ${id} was successfully deleted!`;
  },
};
