import React, { FormEvent, useState, useEffect } from 'react';
import Dropdown, { type DropdownOptionType } from './Dropdown';
import DatePicker from "react-datepicker";
import axios, { AxiosError } from 'axios';
import { Airport } from '@/types/airport';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { setError, setFlights, setLoading } from '@/store/flights';
import { getAirportString } from '@/utils';
import { submitForm } from '@/store/search';

export const SearchForm = () => {
  const [airports, setAirports] = useState<DropdownOptionType[]>([]);
  const [isReturn, setIsReturn] = useState(true);
  const [fromWhere, setFromWhere] = useState('');
  const [toWhere, setToWhere] = useState('');
  const [departureDate, setDepartureDate] = useState(new Date());
  const [arrivalDate, setArrivalDate] = useState(new Date());

  const dispatch = useDispatch();

  const fetchAirports = async () => {
    try {
      const { data } = await axios.get('http://localhost:3000/api/airports');
      if(data.isSucceed) {
        const airports: DropdownOptionType[] = data.data.map((airport: Airport) => ({
          value: airport.id,
          label: getAirportString(airport)
        }))
        setAirports(airports);
      } else {
        toast.error(data.message, {
          position: toast.POSITION.BOTTOM_RIGHT
        });
      }
    } catch (err) {
      toast.error((err as AxiosError).message, {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  useEffect(() => {
    fetchAirports();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if(
      (!fromWhere || !toWhere || !departureDate) || (isReturn && !arrivalDate)
    ) {
      toast.error('Please fill the form', {
        position: toast.POSITION.TOP_CENTER
      });
      return;
    }

    let params = `fromWhere=${fromWhere}&toWhere=${toWhere}&departureDate=${departureDate.getTime()}`;
    if(isReturn){
      params += `&arrivalDate=${arrivalDate.getTime()}`
    }
    console.log(params);
    dispatch(setLoading(true));
    try {
      const { data: { data, isSucceed, message } } = await axios.get(`http://localhost:3000/api/flights?${params}`);
      if (isSucceed) {
        console.log(data);
        dispatch(setFlights(data));
        dispatch(setError(''));
      } else {
        dispatch(setFlights(data))
        dispatch(setError(message));
      }
    } catch (err) {
      dispatch(setError(err as string));
    } finally {
      dispatch(setLoading(false));
      dispatch(submitForm());
    }
  };

  const AirportQuestions = () => (
    <div style={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '5px',
      flexGrow: '1'
    }}>
      <Dropdown 
        name={"from"} 
        value={fromWhere} 
        onSelected={value => {
          if(value === toWhere) {
            setToWhere('');
          }
          setFromWhere(value);
        }} 
        options={airports}
      ></Dropdown>
      <Dropdown 
        name={"to"} 
        value={toWhere} 
        onSelected={value => setToWhere(value)} 
        options={airports.filter(airport => airport.value !== fromWhere)}
      ></Dropdown>
    </div>
  )

  const DateQuestions = () => (
    <div style={{
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      flexDirection: 'row',
      gap: '5px',
      flexGrow: '1'
    }}>
      <div className='custom-datepicker'>
        <DatePicker 
          name="departure"
          selected={departureDate} 
          onChange={(date: Date) => {
            console.log(date.getTime());
            if (date > arrivalDate) {
              setArrivalDate(date);
            }
            setDepartureDate(date);
          }} 
        />
      </div>
      { isReturn && (
        <div className='custom-datepicker'>
          <DatePicker 
            minDate={departureDate}
            name="arrival"
            selected={arrivalDate} 
            onChange={(date: Date) => setArrivalDate(date)} 
          />
        </div>
      )}
    </div>
  )

  return(
    <>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
      }}>
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            minWidth: '1200px',
            gap: '30px'
          }}
        >
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <div>
              <input 
                type="radio" 
                id="return" 
                name="type" 
                value="return" 
                defaultChecked 
                onChange={() => setIsReturn(true)}
              ></input>
              <label htmlFor='return'>Return Trip</label>
              <input 
                type="radio" 
                id="one_way" 
                name="type" 
                value="one_way" 
                onChange={() => setIsReturn(false)}
              ></input>
              <label htmlFor='one_way'>One Way</label>
            </div>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: '10px'
            }}>
              <AirportQuestions />
              <DateQuestions />
            </div>
            <button className="submit-button" type="submit">Submit</button>
          </div>
        </form>
      </div>
      <ToastContainer/>
    </>
  )
}
