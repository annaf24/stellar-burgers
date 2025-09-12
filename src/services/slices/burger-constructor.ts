import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { nanoid } from 'nanoid';

type TConstructorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
};

const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        console.log('Reducer received payload:', action.payload);
        console.log('State before adding:', state);

        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
        console.log('State after adding:', state);
      },
      prepare: (ingredient: TIngredient) => {
        //LOG
        console.log('Preparing ingredient for reducer:', ingredient);
        return {
          payload: { ...ingredient, id: nanoid() } as TConstructorIngredient
        };
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (
      state,
      action: PayloadAction<{ fromIndex: number; toIndex: number }>
    ) => {
      const { fromIndex, toIndex } = action.payload;
      const moved = state.ingredients[fromIndex];
      state.ingredients.splice(fromIndex, 1);
      state.ingredients.splice(toIndex, 0, moved);
    },
    resetConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  },
  selectors: {
    // getIngredients: (state) => state.ingredients,
    // getBun: (state) => state.bun,
    // getConstructorSelector: (state) => state,
    getConstructorItems: (state) => ({
      bun: state.bun,
      ingredients: state.ingredients ?? []
    })
  }
});

// export const {
//   addIngredient,
//   removeIngredient,
//   moveIngredient,
//   resetConstructor
// } = constructorSlice.actions;

export const constructorActions = constructorSlice.actions;

export const constructorSelectors = constructorSlice.selectors;

export default constructorSlice;
