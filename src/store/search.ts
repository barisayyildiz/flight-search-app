import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { AppState } from ".";
import type { FlightListResponseType } from "@/types/flight";

export type SearchState = {
  submitted: boolean
}

const initialState: SearchState = {
  submitted: false
};

const search = createSlice({
  name: "search",
  initialState,
  reducers: {
    submitForm: (state) => {
      state.submitted = true;
    }
  }
});

export const { submitForm } = search.actions
export const selectSearch = (state: AppState) => state.search

export default search.reducer;
