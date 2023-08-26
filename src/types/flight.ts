import { Airport } from "./airport"

export type Flight = {
  id: string,
  from: Airport,
  to: Airport,
  departure: Date | string,
  arrival: Date | string,
  price: number
}

export type FlightListResponseTypeItem = (Flight & {
  flightTime: string
})

export type FlightListResponseType = {
  from: FlightListResponseTypeItem[],
  to?: FlightListResponseTypeItem[]
}
