import { Airport } from "@/types/airport"
import { Flight } from "@/types/flight";

export const airports: Airport[] = [
  {
    id: "1",
    name: "John F. Kennedy International Airport",
    city: "New York City"
  },
  {
    id: "2",
    name: "Los Angeles International Airport",
    city: "Los Angeles"
  },
  {
    id: "3",
    name: "Heathrow Airport",
    city: "London"
  },
  {
    id: "4",
    name: "Narita International Airport",
    city: "Tokyo"
  },
  {
    id: "5",
    name: "Charles de Gaulle Airport",
    city: "Paris"
  },
  {
    id: "6",
    name: "Sydney Kingsford Smith Airport",
    city: "Sydney"
  },
  {
    id: "7",
    name: "Dubai International Airport",
    city: "Dubai"
  },
  {
    id: "8",
    name: "O'Hare International Airport",
    city: "Chicago"
  },
  {
    id: "9",
    name: "Frankfurt Airport",
    city: "Frankfurt"
  },
  {
    id: "10",
    name: "Hong Kong International Airport",
    city: "Hong Kong"
  },
  {
    id: "11",
    name: "Suvarnabhumi Airport",
    city: "Bangkok"
  },
  {
    id: "12",
    name: "Adolfo Suárez Madrid–Barajas Airport",
    city: "Madrid"
  },
  {
    id: "13",
    name: "Toronto Pearson International Airport",
    city: "Toronto"
  },
  {
    id: "14",
    name: "Schiphol Airport",
    city: "Amsterdam"
  },
  {
    id: "15",
    name: "Incheon International Airport",
    city: "Seoul"
  },
  {
    id: "16",
    name: "Singapore Changi Airport",
    city: "Singapore"
  },
  {
    id: "17",
    name: "Leonardo da Vinci–Fiumicino Airport",
    city: "Rome"
  },
  {
    id: "18",
    name: "Dallas/Fort Worth International Airport",
    city: "Dallas/Fort Worth"
  },
  {
    id: "19",
    name: "Beijing Capital International Airport",
    city: "Beijing"
  },
  {
    id: "20",
    name: "Munich Airport",
    city: "Munich"
  }
];

const getRandomDateWithinRange = (startDays: number, endDays: number): Date => {
  const currentDate = new Date();
  const startDate = new Date(currentDate.getTime() + startDays * 24 * 60 * 60 * 1000);
  const endDate = new Date(currentDate.getTime() + endDays * 24 * 60 * 60 * 1000);
  
  const randomTimestamp = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  const randomDate = new Date(randomTimestamp);
  
  return randomDate;
}

export const generateFlights = (n = 1000): Flight[] => {
  const flights: Flight[] = [];
  const minAirportId = 1;
  const maxAirportId = 20;
  
  for(let i=0; i<n; i++) {
    const price = Math.floor(Math.random() * 450) + 50;
    const from = airports[Math.floor(Math.random() * airports.length)];
    let to = airports[Math.floor(Math.random() * airports.length)];
    while(to.id === from.id) {
      to = airports[Math.floor(Math.random() * airports.length)];
    }

    const departure = getRandomDateWithinRange(0,3);
    let arrival = getRandomDateWithinRange(0,6);
    while (arrival < departure) {
      arrival = getRandomDateWithinRange(0,6);
    }

    flights.push({
      id: i.toString(),
      from: from,
      to: to,
      departure,
      arrival,
      price
    })
  }
  return flights;
}

export const flights: Flight[] = [
  {
    id: "1",
    from: airports[0],
    to: airports[1],
    arrival: new Date("2023-08-25T10:30:00"),
    departure: new Date("2023-08-25T08:00:00"),
    price: 250
  },
  {
    id: "2",
    from: airports[2],
    to: airports[3],
    arrival: new Date("2023-08-25T15:30:00"),
    departure: new Date("2023-08-25T10:00:00"),
    price: 450
  },
  {
    id: "3",
    from: airports[4],
    to: airports[5],
    arrival: new Date("2023-08-25T12:45:00"),
    departure: new Date("2023-08-25T11:00:00"),
    price: 320
  },
  {
    id: "4",
    from: airports[6],
    to: airports[7],
    arrival: new Date("2023-08-25T18:20:00"),
    departure: new Date("2023-08-25T16:30:00"),
    price: 280
  },
  {
    id: "5",
    from: airports[8],
    to: airports[9],
    arrival: new Date("2023-08-25T14:10:00"),
    departure: new Date("2023-08-25T12:00:00"),
    price: 390
  },
  {
    id: "6",
    from: airports[10],
    to: airports[11],
    arrival: new Date("2023-08-25T09:45:00"),
    departure: new Date("2023-08-25T07:30:00"),
    price: 220
  },
  {
    id: "7",
    from: airports[12],
    to: airports[13],
    arrival: new Date("2023-08-25T11:30:00"),
    departure: new Date("2023-08-25T09:00:00"),
    price: 290
  },
  {
    id: "8",
    from: airports[14],
    to: airports[15],
    arrival: new Date("2023-08-25T16:40:00"),
    departure: new Date("2023-08-25T14:15:00"),
    price: 410
  },
  {
    id: "9",
    from: airports[16],
    to: airports[17],
    arrival: new Date("2023-08-25T19:00:00"),
    departure: new Date("2023-08-25T16:30:00"),
    price: 350
  },
  {
    id: "10",
    from: airports[18],
    to: airports[19],
    arrival: new Date("2023-08-25T20:15:00"),
    departure: new Date("2023-08-25T18:00:00"),
    price: 280
  },
  {
    id: "11",
    from: airports[0],
    to: airports[2],
    arrival: new Date("2023-08-26T11:30:00"),
    departure: new Date("2023-08-26T09:00:00"),
    price: 420
  },
  {
    id: "12",
    from: airports[3],
    to: airports[5],
    arrival: new Date("2023-08-26T14:20:00"),
    departure: new Date("2023-08-26T12:00:00"),
    price: 330
  },
  {
    id: "13",
    from: airports[6],
    to: airports[8],
    arrival: new Date("2023-08-26T18:10:00"),
    departure: new Date("2023-08-26T16:00:00"),
    price: 270
  },
  {
    id: "14",
    from: airports[9],
    to: airports[11],
    arrival: new Date("2023-08-26T09:30:00"),
    departure: new Date("2023-08-26T07:15:00"),
    price: 230
  },
  {
    id: "15",
    from: airports[12],
    to: airports[14],
    arrival: new Date("2023-08-26T13:45:00"),
    departure: new Date("2023-08-26T11:30:00"),
    price: 310
  },
  {
    id: "16",
    from: airports[15],
    to: airports[17],
    arrival: new Date("2023-08-26T16:30:00"),
    departure: new Date("2023-08-26T14:00:00"),
    price: 470
  },
  {
    id: "17",
    from: airports[18],
    to: airports[0],
    arrival: new Date("2023-08-26T17:45:00"),
    departure: new Date("2023-08-26T15:30:00"),
    price: 290
  },
  {
    id: "18",
    from: airports[1],
    to: airports[3],
    arrival: new Date("2023-08-26T20:10:00"),
    departure: new Date("2023-08-26T18:00:00"),
    price: 490
  },
  {
    id: "19",
    from: airports[4],
    to: airports[6],
    arrival: new Date("2023-08-26T10:45:00"),
    departure: new Date("2023-08-26T08:30:00"),
    price: 240
  },
  {
    id: "20",
    from: airports[7],
    to: airports[9],
    arrival: new Date("2023-08-26T15:30:00"),
    departure: new Date("2023-08-26T13:15:00"),
    price: 360
  },
  {
    id: "21",
    from: airports[10],
    to: airports[12],
    arrival: new Date("2023-08-27T08:00:00"),
    departure: new Date("2023-08-27T05:45:00"),
    price: 270
  },
  {
    id: "22",
    from: airports[13],
    to: airports[15],
    arrival: new Date("2023-08-27T12:20:00"),
    departure: new Date("2023-08-27T10:00:00"),
    price: 410
  },
  {
    id: "23",
    from: airports[16],
    to: airports[18],
    arrival: new Date("2023-08-27T15:45:00"),
    departure: new Date("2023-08-27T13:30:00"),
    price: 320
  },
  {
    id: "24",
    from: airports[19],
    to: airports[1],
    arrival: new Date("2023-08-27T19:10:00"),
    departure: new Date("2023-08-27T16:45:00"),
    price: 470
  },
  {
    id: "25",
    from: airports[2],
    to: airports[4],
    arrival: new Date("2023-08-27T09:30:00"),
    departure: new Date("2023-08-27T07:15:00"),
    price: 280
  },
  {
    id: "26",
    from: airports[5],
    to: airports[7],
    arrival: new Date("2023-08-27T14:15:00"),
    departure: new Date("2023-08-27T11:45:00"),
    price: 350
  },
  {
    id: "27",
    from: airports[8],
    to: airports[10],
    arrival: new Date("2023-08-27T18:40:00"),
    departure: new Date("2023-08-27T16:30:00"),
    price: 290
  },
  {
    id: "28",
    from: airports[11],
    to: airports[13],
    arrival: new Date("2023-08-28T08:30:00"),
    departure: new Date("2023-08-28T06:00:00"),
    price: 240
  },
  {
    id: "29",
    from: airports[14],
    to: airports[16],
    arrival: new Date("2023-08-28T11:20:00"),
    departure: new Date("2023-08-28T09:00:00"),
    price: 290
  },
  {
    id: "30",
    from: airports[17],
    to: airports[19],
    arrival: new Date("2023-08-28T15:00:00"),
    departure: new Date("2023-08-28T12:45:00"),
    price: 410
  },
  {
    id: "31",
    from: airports[0],
    to: airports[3],
    arrival: new Date("2023-08-28T18:30:00"),
    departure: new Date("2023-08-28T16:15:00"),
    price: 330
  },
  {
    id: "32",
    from: airports[4],
    to: airports[7],
    arrival: new Date("2023-08-28T10:40:00"),
    departure: new Date("2023-08-28T08:30:00"),
    price: 260
  },
  {
    id: "33",
    from: airports[8],
    to: airports[11],
    arrival: new Date("2023-08-28T14:55:00"),
    departure: new Date("2023-08-28T12:45:00"),
    price: 320
  },
  {
    id: "34",
    from: airports[12],
    to: airports[15],
    arrival: new Date("2023-08-29T08:10:00"),
    departure: new Date("2023-08-29T06:00:00"),
    price: 250
  },
  {
    id: "35",
    from: airports[16],
    to: airports[19],
    arrival: new Date("2023-08-29T11:45:00"),
    departure: new Date("2023-08-29T09:30:00"),
    price: 390
  },
  {
    id: "36",
    from: airports[0],
    to: airports[2],
    arrival: new Date("2023-08-29T15:20:00"),
    departure: new Date("2023-08-29T13:00:00"),
    price: 280
  },
  {
    id: "37",
    from: airports[3],
    to: airports[5],
    arrival: new Date("2023-08-29T09:55:00"),
    departure: new Date("2023-08-29T07:30:00"),
    price: 220
  },
  {
    id: "38",
    from: airports[6],
    to: airports[8],
    arrival: new Date("2023-08-29T13:40:00"),
    departure: new Date("2023-08-29T11:30:00"),
    price: 300
  },
  {
    id: "39",
    from: airports[9],
    to: airports[11],
    arrival: new Date("2023-08-29T17:15:00"),
    departure: new Date("2023-08-29T15:00:00"),
    price: 340
  },
  {
    id: "40",
    from: airports[12],
    to: airports[14],
    arrival: new Date("2023-08-29T20:30:00"),
    departure: new Date("2023-08-29T18:15:00"),
    price: 430
  },
  {
    id: "41",
    from: airports[15],
    to: airports[17],
    arrival: new Date("2023-08-30T10:15:00"),
    departure: new Date("2023-08-30T08:00:00"),
    price: 270
  },
  {
    id: "42",
    from: airports[18],
    to: airports[1],
    arrival: new Date("2023-08-30T14:45:00"),
    departure: new Date("2023-08-30T12:30:00"),
    price: 300
  },
  {
    id: "43",
    from: airports[2],
    to: airports[4],
    arrival: new Date("2023-08-30T18:00:00"),
    departure: new Date("2023-08-30T15:45:00"),
    price: 380
  },
  {
    id: "44",
    from: airports[5],
    to: airports[7],
    arrival: new Date("2023-08-30T09:30:00"),
    departure: new Date("2023-08-30T07:15:00"),
    price: 260
  },
  {
    id: "45",
    from: airports[8],
    to: airports[10],
    arrival: new Date("2023-08-30T12:20:00"),
    departure: new Date("2023-08-30T10:00:00"),
    price: 340
  },
  {
    id: "46",
    from: airports[11],
    to: airports[13],
    arrival: new Date("2023-08-31T16:10:00"),
    departure: new Date("2023-08-31T14:00:00"),
    price: 280
  },
  {
    id: "47",
    from: airports[14],
    to: airports[16],
    arrival: new Date("2023-08-31T20:00:00"),
    departure: new Date("2023-08-31T17:45:00"),
    price: 410
  },
  {
    id: "48",
    from: airports[17],
    to: airports[19],
    arrival: new Date("2023-08-31T09:45:00"),
    departure: new Date("2023-08-31T07:30:00"),
    price: 320
  },
  {
    id: "49",
    from: airports[0],
    to: airports[3],
    arrival: new Date("2023-08-31T13:20:00"),
    departure: new Date("2023-08-31T11:00:00"),
    price: 370
  },
  {
    id: "50",
    from: airports[4],
    to: airports[7],
    arrival: new Date("2023-08-31T17:40:00"),
    departure: new Date("2023-08-31T15:30:00"),
    price: 290
  },
  {
    id: "51",
    from: airports[8],
    to: airports[11],
    arrival: new Date("2023-08-31T21:15:00"),
    departure: new Date("2023-08-31T18:45:00"),
    price: 440
  },
  {
    id: "52",
    from: airports[12],
    to: airports[15],
    arrival: new Date("2023-09-01T09:30:00"),
    departure: new Date("2023-09-01T07:00:00"),
    price: 250
  },
  {
    id: "53",
    from: airports[16],
    to: airports[19],
    arrival: new Date("2023-09-01T14:00:00"),
    departure: new Date("2023-09-01T11:45:00"),
    price: 350
  },
  {
    id: "54",
    from: airports[0],
    to: airports[2],
    arrival: new Date("2023-09-01T18:20:00"),
    departure: new Date("2023-09-01T16:00:00"),
    price: 280
  },
  {
    id: "55",
    from: airports[3],
    to: airports[5],
    arrival: new Date("2023-09-01T10:45:00"),
    departure: new Date("2023-09-01T08:30:00"),
    price: 230
  },
  {
    id: "56",
    from: airports[6],
    to: airports[8],
    arrival: new Date("2023-09-02T12:30:00"),
    departure: new Date("2023-09-02T10:00:00"),
    price: 290
  },
  {
    id: "57",
    from: airports[9],
    to: airports[11],
    arrival: new Date("2023-09-02T16:10:00"),
    departure: new Date("2023-09-02T14:00:00"),
    price: 330
  },
  {
    id: "58",
    from: airports[12],
    to: airports[14],
    arrival: new Date("2023-09-02T19:45:00"),
    departure: new Date("2023-09-02T17:30:00"),
    price: 420
  },
  {
    id: "59",
    from: airports[15],
    to: airports[17],
    arrival: new Date("2023-09-03T10:30:00"),
    departure: new Date("2023-09-03T08:15:00"),
    price: 260
  },
  {
    id: "60",
    from: airports[18],
    to: airports[1],
    arrival: new Date("2023-09-03T14:55:00"),
    departure: new Date("2023-09-03T12:30:00"),
    price: 310
  }
]
