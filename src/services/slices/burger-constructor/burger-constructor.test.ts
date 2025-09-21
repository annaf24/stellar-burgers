import { describe, test, expect, jest } from '@jest/globals';
import constructorSlice, { constructorActions } from '../../slices/burger-constructor/burger-constructor';
import { TIngredient } from '../../../utils/types';

// Мок nanoid для фиксированного id
jest.mock('nanoid', () => ({ nanoid: () => 'fixed-id-123' }));

// Мок ингредиентов
const mockIngredients: TIngredient[] = [
  {
    _id: '1',
    name: 'Котлета',
    type: 'main',
    proteins: 10,
    fat: 5,
    carbohydrates: 1,
    calories: 100,
    price: 200,
    image: '',
    image_mobile: '',
    image_large: ''
  },
  {
    _id: '2',
    name: 'Соус',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 10,
    price: 50,
    image: '',
    image_mobile: '',
    image_large: ''
  }
];

// Мок булки
const mockBun: TIngredient = {
  _id: 'bun1',
  name: 'Булка',
  type: 'bun',
  proteins: 10,
  fat: 5,
  carbohydrates: 10,
  calories: 100,
  price: 300,
  image: '',
  image_mobile: '',
  image_large: ''
};

describe('constructorSlice', () => {
  const initialState = { bun: null, ingredients: [] };

  test('addIngredient добавляет булку', () => {
    const state = constructorSlice.reducer(
      initialState,
      constructorActions.addIngredient(mockBun)
    );
    expect(state.bun).toEqual({ ...mockBun, id: 'fixed-id-123' });
    expect(state.ingredients).toHaveLength(0);
  });

  test('addIngredient добавляет начинку через prepare', () => {
    const ingredient = mockIngredients[0];
    const state = constructorSlice.reducer(initialState, constructorActions.addIngredient(ingredient));

    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toMatchObject({
      _id: ingredient._id,
      name: ingredient.name,
      id: 'fixed-id-123'
    });
    expect(state.bun).toBeNull();
  });

  test('removeIngredient удаляет ингредиент по id', () => {
    const added = constructorSlice.reducer(initialState, constructorActions.addIngredient(mockIngredients[0]));
    const idToRemove = added.ingredients[0].id;

    const state = constructorSlice.reducer(added, constructorActions.removeIngredient(idToRemove));
    expect(state.ingredients).toHaveLength(0);
  });

  test('moveIngredient меняет порядок ингредиентов', () => {
    let state = constructorSlice.reducer(initialState, constructorActions.addIngredient(mockIngredients[0]));
    state = constructorSlice.reducer(state, constructorActions.addIngredient(mockIngredients[1]));

    const stateMoved = constructorSlice.reducer(state, constructorActions.moveIngredient({ fromIndex: 0, toIndex: 1 }));
    expect(stateMoved.ingredients[0]._id).toBe(mockIngredients[1]._id);
    expect(stateMoved.ingredients[1]._id).toBe(mockIngredients[0]._id);
  });

  test('resetConstructor очищает булку и ингредиенты', () => {
    const stateWithData = {
      bun: { ...mockBun, id: 'fixed-id-123' },
      ingredients: [{ ...mockIngredients[0], id: 'fixed-id-123' }]
    };
    const cleared = constructorSlice.reducer(stateWithData, constructorActions.resetConstructor());

    expect(cleared.bun).toBeNull();
    expect(cleared.ingredients).toEqual([]);
  });
});