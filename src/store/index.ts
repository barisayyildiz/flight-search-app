import { configureStore, combineReducers } from '@reduxjs/toolkit';
import flights from './flights';

const rootReducer = combineReducers({
  flights,
});

const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type AppState = ReturnType<typeof rootReducer>;

export default store;
