import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gameReducer from './gameSlice';

const rootReducer = combineReducers({ game: gameReducer });

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
