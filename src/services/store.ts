import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import ingredientsSlice from './slices/ingredients/ingredients';
import constructorSlice from './slices/burger-constructor/burger-constructor';
import orderSlice from './slices/order/order';
import feedSlice from './slices/feeds/feeds';
import profileSlice from './slices/profile/profile';

const rootReducer = combineReducers({
  ingredients: ingredientsSlice.reducer,
  burgerConstructor: constructorSlice.reducer,
  order: orderSlice.reducer,
  feed: feedSlice.reducer,
  profile: profileSlice.reducer
}); // +++Заменить на импорт настоящего редьюсера

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof rootReducer>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
