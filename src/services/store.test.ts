import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './store'; // Убедитесь, что путь правильный
const initialState = {
  ingredients: {
    constructorItems: {
      bun: null,
      ingredients: []
    },
    ingredientData: null,
    isLoading: false,
    isError: false,
    buns: [],
    mains: [],
    sauces: [],
    ingredients: []
  },
  feed: {
    isLoading: false,
    isError: false,
    orderRequest: false,
    userOrders: [],
    orderData: null,
    orders: [],
    total: 0,
    totalToday: 0
  },
  users: {
    isAuthChecked: false,
    isLoading: false,
    isError: false,
    error: '',
    user: {
      name: '',
      email: ''
    }
  }
};
describe('rootReducer', () => {
  it('проверка иницализации корневого редьюсера', () => {
    const store = configureStore({ reducer: rootReducer() });
    const state = store.getState();
    expect(state).toEqual(initialState);
  });
});
