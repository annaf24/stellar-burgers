import { getOrderByNumberApi, getOrdersApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderState = {
  order: TOrder | null;
  allOrders: TOrder[];
  placedOrderData: TOrder | null;
  orderRequest: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  order: null,
  allOrders: [],
  placedOrderData: null,
  orderRequest: false,
  error: null
};

//Thunk-функции

//Создать заказ
export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[]) => {
    const orderResponse = await orderBurgerApi(ingredientIds);
    return orderResponse.order;
  }
);

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
      state.placedOrderData = null;
    }
  },
  selectors: {
    getOrder: (state) => state.order,
    getAllOrders: (state) => state.allOrders,
    getPlacedOrderData: (state) => state.placedOrderData,
    getOrderRequest: (state) => state.orderRequest,
    getOrderError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.placedOrderData = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка';
      })
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
