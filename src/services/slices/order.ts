import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  allOrders: TOrder[];
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  allOrders: [],
  orderRequest: false,
  error: null
};

//Thunk-функции

//Получить заказы
export const fetchOrders = createAsyncThunk('orders/fetchOrders', getOrdersApi);

//Получить заказ по номеру
export const fetchOrderByNumber = createAsyncThunk(
  'order/fetchOrderByNumber',
  async (orderNumber: number) => {
    const orderResponce = await getOrderByNumberApi(orderNumber);
    return orderResponce.orders[0];
  }
);

//Slice
const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderData: (state) => {
      state.order = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getAllOrders: (state) => state.allOrders,
    getOrderRequest: (state) => state.orderRequest,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.allOrders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка';
      })
      .addCase(fetchOrderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка';
      });
  }
});

export const orderSelectors = orderSlice.selectors;
export const orderActions = orderSlice.actions;
export default orderSlice;
