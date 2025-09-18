import {Address as InPeaceAddress} from '@/interface/inpeace/events'

export interface Address {
  street: string
  number: string
  complement: string
  neighborhood: string
  city: string
  state: string
  zip: string
  coordinates: Coordinate
}

export interface Coordinate {
  lat: number,
  lng: number,
}

export function formatAddress(address: Partial<Address>) {
  return [
    address.street,
    address.number,
    address.city,
    address.state,
    address.zip
  ].filter(Boolean).join(', ')
}

export function convertInPeaceAddress(addr?: InPeaceAddress): Partial<Address> {
  return {
    street: addr?.logradouro,
    number: addr?.numero,
    city: addr?.cidade,
    state: addr?.estado,
    zip: addr?.codigoPostal,
    neighborhood: addr?.bairro,
    complement: addr?.complemento,
    coordinates: {
      lat: addr?.latitude ?? 0,
      lng: addr?.longitude ?? 0,
    }
  }
}