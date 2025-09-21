import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  isLoading: boolean;
  total: number;
  totalToday: number;
  error: string | null;
};

const initialState: TFeedState = {
  orders: [],
  isLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

//Thunk-функции
export const fetchFeed = createAsyncThunk('feed/fetchFeed', getFeedsApi);

//Slice
const feedSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {
    clearFeed: () => initialState
  },
  selectors: {
    getOrders: (state) => state.orders,
    getIsLoading: (state) => state.isLoading,
    getTotal: (state) => state.total,
    getTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeed.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeed.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeed.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const feedSelectors = feedSlice.selectors;
export const feedActions = feedSlice.actions;
export default feedSlice;
