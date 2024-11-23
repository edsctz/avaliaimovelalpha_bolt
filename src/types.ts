export type PropertyType = 'apartment' | 'house';

export interface Address {
  cep: string;
  logradouro: string;
  numero?: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export interface PropertyDetails {
  bedrooms: number;
  bathrooms: number;
  squareMeters: number;
  yearBuilt: number;
}

export interface PropertyData extends PropertyDetails {
  type: PropertyType;
  address: Address;
}

export interface LeadData {
  name: string;
  email: string;
  phone: string;
}

export interface FormState {
  step: number;
  type: PropertyType | null;
  cep: string;
  address: Address | null;
  details: PropertyDetails | null;
}