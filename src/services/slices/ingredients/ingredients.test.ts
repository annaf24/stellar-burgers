import { describe, test, expect } from '@jest/globals';
import ingredientsSlice, { fetchIngredients } from './ingredients';

const initialState = {
  items: [],
  isLoading: false,
  error: null
};

const mockIngredients = [
  {
    _id: '1',
    name: 'Котлета',
    type: 'main',
    price: 200,
    proteins: 10,
    fat: 5,
    carbohydrates: 1,
    calories: 100,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

describe('ingredientsSlice reducer', () => {
  test('обрабатывает fetchIngredients.pending', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.pending('', undefined)
    );
    expect(nextState.isLoading).toBe(true);
    expect(nextState.error).toBeNull();
  });

  test('обрабатывает fetchIngredients.fulfilled', () => {
    const nextState = ingredientsSlice.reducer(
      initialState,
      fetchIngredients.fulfilled(mockIngredients, '', undefined)
    );
    expect(nextState.isLoading).toBe(false);
    expect(nextState.items).toEqual(mockIngredients);
    expect(nextState.error).toBeNull();
  });

  test('обрабатывает fetchIngredients.rejected', () => {
    const nextState = ingredientsSlice.reducer(initialState, {
      type: fetchIngredients.rejected.type,
      error: { message: 'Rejected' }
    });

    expect(nextState.isLoading).toBe(false);
    expect(nextState.error).toBe('Rejected');
  });
});
