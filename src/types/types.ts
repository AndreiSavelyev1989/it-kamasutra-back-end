export interface Address {
  country: string;
  city: string;
  street: string;
}

export interface AddressForUpdate {
  country?: string;
  city?: string;
  street?: string;
}
