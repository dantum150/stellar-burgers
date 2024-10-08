import ingredientsSlice, {
  addIngredient,
  deleteIngredient
} from './ingredients-slice';
import { configureStore } from '@reduxjs/toolkit';
import { getIngredients } from './ingredients-slice';
const createTestStore = () =>
  configureStore({
    reducer: {
      ingredients: ingredientsSlice.reducer
    }
  });

describe('ingredientsSlice', () => {
  let initialState: any;
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  beforeEach(() => {
    initialState = {
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
    };
  });

  it('проверка на добавление булки', () => {
    const bun = { _id: '1', name: 'Bun', type: 'bun', price: 100 };
    const nextState = ingredientsSlice.reducer(
      initialState,
      // @ts-ignore
      addIngredient(bun)
    );

    expect(nextState.constructorItems.bun).toEqual(bun);
    expect(nextState.constructorItems.ingredients).toEqual([]);
  });

  it('проверка на добавление не булки', () => {
    const ingredient = {
      _id: '2',
      name: 'Lettuce',
      type: 'main',
      price: 50
    };
    const nextState = ingredientsSlice.reducer(
      initialState,
      // @ts-ignore
      addIngredient(ingredient)
    );

    expect(nextState.constructorItems.bun).toBeNull();
    expect(nextState.constructorItems.ingredients).toHaveLength(1);
    expect(nextState.constructorItems.ingredients[0]).toMatchObject({
      ...ingredient,
      id: expect.any(String) // Проверка, что добавлен id
    });
  });

  it('удаление по id', () => {
    const ingredient1 = {
      _id: '2',
      name: 'Lettuce',
      type: 'main',
      price: 50,
      id: '12345'
    };
    const ingredient2 = {
      _id: '3',
      name: 'Tomato',
      type: 'main',
      price: 30,
      id: '67890'
    };

    initialState.constructorItems.ingredients.push(ingredient1, ingredient2);

    const nextState = ingredientsSlice.reducer(
      initialState,
      deleteIngredient('12345')
    );

    expect(nextState.constructorItems.ingredients).toHaveLength(1);
    expect(nextState.constructorItems.ingredients[0].id).toBe('67890');
  });

  it('проверка состояния pending', () => {
    expect(store.getState().ingredients.isLoading).toBe(false);

    store.dispatch(getIngredients.pending('', undefined));

    expect(store.getState().ingredients.isLoading).toBe(true);
  });

  it('проверка состояния rejected', () => {
    expect(store.getState().ingredients.isLoading).toBe(false);
    expect(store.getState().ingredients.isError).toBe(false);

    const errorMessage = 'Failed to fetch ingredients';
    //@ts-ignore
    store.dispatch(
      getIngredients.rejected(new Error(errorMessage), '', undefined)
    );

    const state = store.getState().ingredients;

    expect(state.isLoading).toBe(false);

    expect(state.isError).toBe(true);
  });

  it('проверка состояния fulfilled', () => {
    const mockIngredients = [
      { _id: '1', name: 'Bun', type: 'bun', price: 100 },
      { _id: '2', name: 'Sauce', type: 'sauce', price: 50 }
    ];

    //@ts-ignore
    store.dispatch(getIngredients.fulfilled(mockIngredients, '', undefined));

    const state = store.getState().ingredients;

    expect(state.isLoading).toBe(false);

    expect(state.ingredients).toEqual(mockIngredients);
  });
});
