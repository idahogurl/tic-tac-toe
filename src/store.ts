import { configureStore, combineReducers } from "@reduxjs/toolkit";
import gameReducer from './gameSlice';

const rootReducer = combineReducers({ game: gameReducer });

const store = configureStore({
  reducer: {
    game: gameReducer,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
