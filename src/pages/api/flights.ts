import type { NextApiRequest, NextApiResponse } from 'next';
import { BaseResponseType } from '@/types/api';
import type { Flight, FlightListResponseType } from '@/types/flight';
import { generateFlights } from '@/utils';

const flights: Flight[] = generateFlights(2000);

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<BaseResponseType<FlightListResponseType>>
) {
  if (req.method !== 'GET') {
    return res.status(405).json({
      isSucceed: false,
      message: 'Method not allowed',
      data: null
    });
  }

  const { fromWhere, toWhere, departureDate, arrivalDate } = req.query;

  if (typeof fromWhere !== 'string' || typeof departureDate !== 'string') {
    return res.status(400).json({
      isSucceed: false,
      message: 'Invalid query parameters',
      data: null
    });
  }

  const parsedDepartureDate = new Date(Number(departureDate));
  const parsedArrivalDate = typeof arrivalDate === 'string' ? new Date(Number(arrivalDate)) : undefined;

  const returnTrip = parsedArrivalDate;

  let filteredOutboundFlights = flights.filter(
    flight => {
      return flight.from.id === fromWhere &&
      flight.to.id === toWhere &&
      new Date(flight.departure).toDateString() === parsedDepartureDate.toDateString()
    }
  );

  let filteredReturnFlights: Flight[] = [];
  if (returnTrip) {
    filteredReturnFlights = flights.filter(
      flight => {
        return flight.from.id === toWhere && // dönüş uçağının kalktığı yer, ilk gittiğimiz yer olmalı
        flight.to.id === fromWhere && // dönüş uçuşunun gideceği yer, başladığımız nokta olmalı
        new Date(flight.departure).toDateString() === parsedArrivalDate.toDateString()
      }
    );
  }

  filteredOutboundFlights = filteredOutboundFlights.map(flight => ({
    ...flight,
    flightTime: flight.arrival - flight.departure,
  }));

  filteredReturnFlights = filteredReturnFlights.map(flight => ({
    ...flight,
    flightTime: flight.arrival - flight.departure
  }))

  return res.status(200).json({
    data: {
      outbound: filteredOutboundFlights,
      ...(returnTrip ? { return: filteredReturnFlights } : {})
    } as FlightListResponseType,
    isSucceed: true,
    message: null
  });
}
