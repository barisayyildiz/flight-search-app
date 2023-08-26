import type { Airport } from "@/types/airport";

export const getFlightTime = (departure: Date, arrival: Date): string => {
  let diffInMilliseconds: number = arrival.getTime() - departure.getTime();

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

