import React, { useCallback, useMemo, useState } from 'react';
import { selectFligts } from '@/store/flights';
import { selectSearch } from '@/store/search'
import { useSelector } from 'react-redux';
import { getAirportString } from '@/utils';

const FlightList = () => {
  const { flights, loading, error } = useSelector(selectFligts);
  const { submitted } = useSelector(selectSearch);

  const [tab, setTab] = useState<'going' | 'return'>(flights.to ? 'going' : 'return')

  const GoingFlights = useCallback(() => (
    <ul style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'center'
    }}>
      {flights.from.map(flight => (
        <li key={flight.id} style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          justifyContent: 'center',
          alignItems: 'flex-start',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0px 20px',
          maxWidth: '1000px',
          cursor: 'pointer'
        }}>
          <div>
            <p><b>{flight.id}</b></p>
          </div>
          <div>
            <p><b>From: </b> {getAirportString(flight.from) }</p>
            <p><b>To: </b> {getAirportString(flight.to)}</p>
          </div>
          <div>
            <p><b>Departure: </b> {flight.departure as string}</p>
            <p><b>Arrival: </b> {flight.departure as string}</p>
            <p><b>Flight Time: </b> {flight.flightTime}</p>
          </div>
          <div>
            <p><b>Price : </b> {flight.price}$</p>
          </div>
        </li>
      ))}
    </ul>
  ), [flights.from]);

  const ReturnFlights = useCallback(() => (
    <ul style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      alignItems: 'center'
    }}>
      {flights.to?.map(flight => (
        <li key={flight.id} style={{
          listStyle: 'none',
          display: 'flex',
          flexDirection: 'row',
          gap: '40px',
          justifyContent: 'center',
          alignItems: 'flex-start',
          border: '1px solid #ccc',
          borderRadius: '4px',
          padding: '0px 20px',
          maxWidth: '1000px',
          cursor: 'pointer'
        }}>
          <div>
            <p><b>{flight.id}</b></p>
          </div>
          <div>
            <p><b>From: </b> {getAirportString(flight.from) }</p>
            <p><b>To: </b> {getAirportString(flight.to)}</p>
          </div>
          <div>
            <p><b>Departure: </b> {flight.departure as string}</p>
            <p><b>Arrival: </b> {flight.departure as string}</p>
            <p><b>Flight Time: </b> {flight.flightTime}</p>
          </div>
          <div>
            <p><b>Price : </b> {flight.price}$</p>
          </div>
        </li>
      ))}
    </ul>
  ), [flights.to]);

  const ErrorField = () => (
    <div style={{
      backgroundColor: '#f55f5f',
      padding: '10px 30px',
      color: '#fff',
      borderRadius: '4px',
    }}>
      {error}
    </div>
  )

  const emptyResult = useMemo(() => {
    if(tab === 'going' && !flights.from.length) return true;
    if(tab === 'return' && flights.to && !flights.to.length) return true;
    return false;
  }, [flights, tab]);

  if(!submitted) {
    return null;
  }

  return (
    <div style={{
      display: 'flex',
      gap: '20px',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      margin: '40px 0px',
      fontSize: '1.15rem'
    }}>
      { loading ? 'Loading...' : 
        error ? <ErrorField /> :
        (emptyResult) ? <p>No results were found</p> : (
          <>
            <h2>{tab === 'going' ? 'Going Flights' : 'Return Flights'}</h2>
            {tab === 'going' ? <GoingFlights /> : <ReturnFlights />}
          </>
        )
      }
      <div>
        <input 
          type="radio" 
          id="going_flights" 
          name="type" 
          value="going_flights" 
          defaultChecked 
          onChange={() => setTab('going')}
        ></input>
        <label htmlFor='going_flights'>Going Flights</label>
        {
          flights.to && (
            <>
              <input 
                type="radio" 
                id="return_flights" 
                name="type" 
                value="return_flights" 
                onChange={() => setTab('return')}
              ></input>
              <label htmlFor='return_flights'>Return Flights</label>
            </>
          )
        }
        </div>
    </div>
  )
  
}

export default FlightList;
