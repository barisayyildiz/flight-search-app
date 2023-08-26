import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flights from './flights';
import search from './search'

const rootReducer = combineReducers({
  flights,
  search,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
