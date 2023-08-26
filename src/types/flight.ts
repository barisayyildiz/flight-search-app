import { Airport } from "./airport"

export type Flight = {
  id: string,
  from: Airport,
  to: Airport,
  departure: Date | string,
  arrival: Date | string,
  price: number
}

export type FlightListResponseType = {
  from: (Flight & {
    flightTime: string
  })[],
  to?: (Flight & {
    flightTime: string
  })[]
}
