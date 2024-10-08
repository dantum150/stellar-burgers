import { configureStore } from '@reduxjs/toolkit';
import ingredientsSlice from './slices/ingredients-slice';
import feedsSlice from './slices/feed-slice';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import usersSlice from './slices/users-slice';

export const rootReducer = () => ({
  ingredients: ingredientsSlice.reducer,
  feed: feedsSlice.reducer,
  users: usersSlice.reducer
}); // Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer(),
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
