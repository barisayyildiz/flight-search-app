import React from 'react';
import type { FlightListResponseTypeItem } from '@/types/flight';
import { getAirportString } from '@/utils';
import { getFlightTime } from '@/utils';
import format from 'date-fns/format';

type FlightListItemProps = {
  flight: FlightListResponseTypeItem
}

const FlightListItem = ({ flight }: FlightListItemProps) => {
  return (
    <li key={flight.id} style={{
      boxSizing: 'border-box',
      listStyle: 'none',
      display: 'flex',
      flexDirection: 'row',
      gap: '40px',
      justifyContent: 'space-around',
      alignItems: 'center',
      border: '1px solid #ccc',
      borderRadius: '4px',
      padding: '0px 20px',
      cursor: 'pointer',
      width: '100%'
    }}>
      <div>
        <p><b>{flight.id}</b></p>
      </div>
      <div>
        <p><b>From: </b> {getAirportString(flight.from) }</p>
        <p><b>To: </b> {getAirportString(flight.to)}</p>
      </div>
      <div>
        <p><b>Departure: </b> {format(flight.departure, "dd/MM/yyyy HH:mm")}</p>
        <p><b>Arrival: </b> {format(flight.arrival, "dd/MM/yyyy HH:mm")}</p>
        <p><b>Flight Time: </b> {getFlightTime(flight.flightTime)}</p>
      </div>
      <div>
        <p><b>Price : </b> {flight.price}$</p>
      </div>
    </li>
  )
}

export default FlightListItem;
