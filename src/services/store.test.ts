import store, { RootState } from './store';
import ingredientsSlice from './slices/ingredients/ingredients';
import constructorSlice from './slices/burger-constructor/burger-constructor';
import orderSlice from './slices/order/order';
import feedSlice from './slices/feeds/feeds';
import profileSlice from './slices/profile/profile';

describe('store', () => {
  it('should return the correct initial state', () => {
    const state: RootState = store.getState();

    expect(state).toEqual({
      ingredients: ingredientsSlice.getInitialState(),
      burgerConstructor: constructorSlice.getInitialState(),
      order: orderSlice.getInitialState(),
      feed: feedSlice.getInitialState(),
      profile: profileSlice.getInitialState(),
    });
  });
});
