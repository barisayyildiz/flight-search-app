import { Airport } from "./airport"

export type Flight = {
  id: string,
  from: Airport,
  to: Airport,
  departure: number,
  arrival: number,
  price: number
}

export type FlightListResponseTypeItem = (Flight & {
  flightTime: number
})

export type FlightListResponseType = {
  outbound: FlightListResponseTypeItem[],
  return?: FlightListResponseTypeItem[]
}
