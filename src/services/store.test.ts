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
    isLoading: true,
    isError: false,
    error: '',
    user: {
      name: '',
      email: ''
    }
  }
};
describe('rootReducer', () => {
  it('проверка инициализации корневого редьюсера', () => {
    const store = rootReducer(undefined, { type: 'qweasd' });
    expect(store).toEqual(initialState);
  });
});
