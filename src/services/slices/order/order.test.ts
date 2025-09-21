import { describe, test, expect } from '@jest/globals';
import orderSlice, { createOrder, fetchOrders, fetchOrderByNumber } from './order';

const initialState = {
  order: null,
  allOrders: [],
  placedOrderData: null,
  orderRequest: false,
  error: null
};

const mockOrder = { 
  number: 123, 
  _id: '1', 
  ingredients: [], 
  status: '', 
  name: '', 
  createdAt: '', 
  updatedAt: '' 
};

describe('orderSlice reducer', () => {
  test('createOrder.pending', () => {
    const nextState = orderSlice.reducer(initialState, createOrder.pending('', []));
    expect(nextState.orderRequest).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('createOrder.fulfilled', () => {
    const nextState = orderSlice.reducer(
      initialState,
      createOrder.fulfilled(mockOrder, '', [] as string[])
    );
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.placedOrderData).toEqual(mockOrder);
  });

  test('createOrder.rejected', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: createOrder.rejected.type,
      error: { message: 'Rejected' }
    });
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.error).toBe('Rejected');
  });

  test('fetchOrders.pending', () => {
    const nextState = orderSlice.reducer(initialState, fetchOrders.pending('', undefined));
    expect(nextState.orderRequest).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('fetchOrders.fulfilled', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrders.fulfilled([mockOrder], '', undefined as unknown as void)
    );
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.allOrders).toEqual([mockOrder]);
  });

  test('fetchOrders.rejected', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: fetchOrders.rejected.type,
      error: { message: 'Rejected' }
    });
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.error).toBe('Rejected');
  });

  test('fetchOrderByNumber.pending', () => {
    const nextState = orderSlice.reducer(initialState, fetchOrderByNumber.pending('', 123));
    expect(nextState.orderRequest).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('fetchOrderByNumber.fulfilled', () => {
    const nextState = orderSlice.reducer(
      initialState,
      fetchOrderByNumber.fulfilled(mockOrder, '', 123)
    );
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.order).toEqual(mockOrder);
  });

  test('fetchOrderByNumber.rejected', () => {
    const nextState = orderSlice.reducer(initialState, {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Rejected' }
    });
    expect(nextState.orderRequest).toBe(false);
    expect(nextState.error).toBe('Rejected');
  });
});
