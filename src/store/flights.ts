import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from ".";
import type { FlightListResponseType } from "@/types/flight";

export type FlightState = {
  flights: FlightListResponseType,
  loading: boolean,
  error: string
}

const initialState: FlightState = {
  flights: {
    outbound: [],
    return: []
  },
  loading: false,
  error: ''
};

const flights = createSlice({
  name: "flights",
  initialState,
  reducers: {
    setFlights: (state, action: PayloadAction<FlightListResponseType>) => {
      state.flights = action.payload
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    }
  }
});

export const { setFlights, setLoading, setError } = flights.actions
export const selectFligts = (state: AppState) => state.flights

export default flights.reducer;
