import type { NextApiRequest, NextApiResponse } from 'next';
import { BaseResponseType } from '@/types/api';
import type { Flight, FlightListResponseType } from '@/types/flight';
import { flights } from '@/constants';
import { getFlightTime } from '@/utils';
import { format } from 'date-fns';

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

  console.log('parsedDepartureDate : ', parsedDepartureDate);
  console.log('parsedArrivalDate : ', parsedArrivalDate);

  console.log('Going Flights');
  let filteredGoingFlights = flights.filter(
    flight => {
      console.log(flight.from.id, flight.to.id, (flight.departure as Date).toDateString());
      return flight.from.id === fromWhere &&
      flight.to.id === toWhere &&
      (flight.departure as Date).toDateString() === parsedDepartureDate.toDateString()
    }
  );

  console.log('Return Flights');
  let filteredReturnFlights: Flight[] = [];
  if (returnTrip) {
    filteredReturnFlights = flights.filter(
      flight => {
        console.log(flight.from.id, flight.to.id, (flight.arrival as Date).toDateString());
        return flight.from.id === toWhere && // dönüş uçağının kalktığı yer, ilk gittiğimiz yer olmalı
        flight.to.id === fromWhere && // dönüş uçuşunun gideceği yer, başladığımız nokta olmalı
        (flight.arrival as Date).toDateString() === parsedArrivalDate.toDateString()
      }
    );
  }

  filteredGoingFlights = filteredGoingFlights.map(flight => ({
    ...flight,
    flightTime: getFlightTime(flight.departure as Date, flight.arrival as Date),
    departure: format((flight.departure as Date), "yyyy-MM-dd HH:mm"),
    arrival: format((flight.arrival as Date), "yyyy-MM-dd HH:mm")
  }));

  filteredReturnFlights = filteredReturnFlights.map(flight => ({
    ...flight,
    flightTime: getFlightTime(flight.departure as Date, flight.arrival as Date),
    departure: format((flight.departure as Date), "yyyy-MM-dd HH:mm"),
    arrival: format((flight.arrival as Date), "yyyy-MM-dd HH:mm")
  }))

  return res.status(200).json({
    data: {
      from: filteredGoingFlights,
      ...(returnTrip ? { to: filteredReturnFlights } : {})
    } as FlightListResponseType,
    isSucceed: true,
    message: null
  });
}
