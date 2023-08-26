import type { Airport } from "@/types/airport";
import type { Flight } from "@/types/flight";
import { airports } from "@/constants";

export const getFlightTime = (diffInMilliseconds: number): string => {
  const HOUR_TO_MILLISECONDS = 3600000;
  const SECOND_TO_MILLISECONDS = 60000;

  let hour = 0;
  let minute = 0;

  while (diffInMilliseconds >= HOUR_TO_MILLISECONDS) {
    diffInMilliseconds -= HOUR_TO_MILLISECONDS;
    hour++;
  }
  while (diffInMilliseconds >= SECOND_TO_MILLISECONDS) {
    diffInMilliseconds -= SECOND_TO_MILLISECONDS;
    minute++;
  }
  
  if (hour) {
    return `${hour} ${hour === 1 ? 'hours' : 'hours'} ${minute ? `, ${minute} minutes` : ''}`
  }

  return `${minute} minutes`
}

export const getAirportString = (airport: Airport): string => `${airport.city} | ${airport.name}`


const getRandomDateWithinRange = (startDays: number, endDays: number): Date => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() + startDays * 24 * 60 * 60 * 1000);
  const endDate = new Date(currentDate.getTime() + endDays * 24 * 60 * 60 * 1000);
  
  const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTimestamp);
  
  return randomDate;
}

function addRandomTimeToDate(baseDate: Date, maxHours: number, maxMinutes: number) {
  const randomHours = Math.floor(Math.random() * (maxHours + 1));
  const randomMinutes = Math.floor(Math.random() * (maxMinutes + 1));

  const newDate = new Date(baseDate);
  newDate.setHours(newDate.getHours() + randomHours);
  newDate.setMinutes(newDate.getMinutes() + randomMinutes);

  return newDate;
}


export const generateFlights = (n = 1000): Flight[] => {
  const flights: Flight[] = [];
  
  for(let i=0; i<n; i++) {
    const price = Math.floor(Math.random() * 450) + 50;
    const from = airports[Math.floor(Math.random() * airports.length)];
    let to = airports[Math.floor(Math.random() * airports.length)];
    while(to.id === from.id) {
      to = airports[Math.floor(Math.random() * airports.length)];
    }

    const departure = getRandomDateWithinRange(0,3);
    const arrival = addRandomTimeToDate(departure, 12, 59);

    flights.push({
      id: i.toString(),
      from: from,
      to: to,
      departure: departure.getTime(),
      arrival: arrival.getTime(),
      price
    })
  }
  return flights;
}

