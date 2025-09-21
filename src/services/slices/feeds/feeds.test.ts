import { describe, test, expect } from '@jest/globals';
import feedSlice, { fetchFeed } from './feeds';

const initialState = {
  orders: [],
  isLoading: false,
  total: 0,
  totalToday: 0,
  error: null
};

const mockOrders = [
  {
    _id: '123',
    status: 'done',
    name: 'Заказ 1',
    createdAt: '',
    updatedAt: '',
    number: 1,
    ingredients: []
  }
];

describe('feedSlice reducer', () => {
  test('должен обработать fetchFeed.pending', () => {
    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('должен обработать fetchFeed.fulfilled', () => {
    const mockResponse = {
      success: true,
      orders: mockOrders,
      total: 10,
      totalToday: 2
    };

    const nextState = feedSlice.reducer(
      initialState,
      fetchFeed.fulfilled(mockResponse, '', undefined)
    );

    expect(nextState.isLoading).toBe(false);
    expect(nextState.orders).toEqual(mockResponse.orders);
    expect(nextState.total).toBe(mockResponse.total);
    expect(nextState.totalToday).toBe(mockResponse.totalToday);
    expect(nextState.error).toBeNull();
  });

  test('должен обработать fetchFeed.rejected', () => {
    const nextState = feedSlice.reducer(initialState, {
      type: fetchFeed.rejected.type,
      error: { message: 'Rejected' }
    });

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Rejected');
  });
});
