import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { selectFligts } from '@/store/flights';
import { selectSearch } from '@/store/search'
import { useSelector } from 'react-redux';
import { getAirportString } from '@/utils';
import type { FlightListResponseTypeItem } from '@/types/flight';
import FlightListItem from './FlightListItem';
import Dropdown from './Dropdown';

const FlightList = () => {
  const { flights, loading, error } = useSelector(selectFligts);
  const { submitted } = useSelector(selectSearch);

  const [tab, setTab] = useState<'outbound' | 'return'>(flights.outbound ? 'outbound' : 'return')
  const [key, setKey] = useState<keyof FlightListResponseTypeItem | null>(null);

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
    if(tab === 'outbound' && flights.outbound && !flights.outbound.length) return true;
    if(tab === 'return' && flights.return && !flights.return.length) return true;
    return false;
  }, [flights, tab]);

  const sortBy: keyof FlightListResponseTypeItem = 'price';
  const sortedData = useMemo(() => {
    const data = [...(tab === 'outbound' ? flights.outbound : flights.return ? flights.return : [])];
    if(!key) return data;
    console.log(key);
    return data.sort((a, b) => (a[key] as number) - (b[key] as number));
  }, [flights, key, tab]);
 
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
      marginBottom: '100px',
      fontSize: '1.15rem',
    }}>
      { loading ? 'Loading...' : 
        error ? <ErrorField /> :
        (emptyResult) ? <p>No results were found</p> : (
          <>
            <div style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'inherit'
            }}>
              <h2>{tab === 'outbound' ? 'Outbound Flights' : 'Return Flights'}</h2>
              <Dropdown 
                style={{
                  width: '300px'
                }}
                name={"from"} 
                value={key as string} 
                placeholder='Sort flights'
                onSelected={value => setKey(value as keyof FlightListResponseTypeItem)} 
                options={[
                  { label: 'Sort by price', value: 'price' },
                  { label: 'Sort by flight time', value: 'flightTime' },
                  { label: 'Sort by departure time', value: 'departure' },
                  { label: 'Sort by arrival time', value: 'arrival' }
                ]}
              ></Dropdown>
            </div>
            {
              <ul style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '15px',
                alignItems: 'center',
                width: '100%'
              }}>
                {sortedData.map(flight => <FlightListItem flight={flight} key={flight.id} />)}
              </ul>
            }
          </>
        )
      }
      <div>
        <input 
          type="radio" 
          id="outbound_flights" 
          name="type" 
          value="outbound_flights" 
          checked={tab === 'outbound'}
          onChange={() => setTab('outbound')}
        ></input>
        <label htmlFor='outbound_flights'>Outbound Flights</label>
        {
          flights.return && (
            <>
              <input 
                type="radio" 
                id="return_flights" 
                name="type" 
                value="return_flights" 
                checked={tab === 'return'}
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
