import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Draft
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient, TConstructorIngredient } from '@utils-types';

// 1. Санки
// 2. Сам слайс

// 1. Для создания санок нам нужна createAsyncThunk(арг1, арг2)
// 1.1 Арг1 - 'ingredients/getIngredients'
// 1.2 Арг2 - функция, которая содержит фетч. Всё, что функция вернёт - это всё попадёт в action.payload

interface IState {
  constructorItems: {
    bun: TIngredient | null;
    ingredients: TConstructorIngredient[];
  };
  isLoading: boolean;
  isError: boolean;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  ingredients: TIngredient[];
}

export const getIngredients = createAsyncThunk(
  'ingredients/getIngerdients',
  async () => getIngredientsApi()
);

const initialState: IState = {
  constructorItems: {
    bun: null,
    ingredients: []
  },

  isLoading: false,
  isError: false,
  buns: [],
  mains: [],
  sauces: [],
  ingredients: []
};
// name - существительное, initialState, reducers
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    // 1. addIngredient
    // 1.1 if кликаем по ингредиенту, который у нас тайпа "булка", то записываем в bun, else - записываем (пушим) в массив countuctorItems.ingredients
    // в редусеры функция (state, action)
    addIngredient(state, action: PayloadAction<TIngredient>) {
      const ingredient = action.payload;
      if (ingredient.type === 'bun') {
        state.constructorItems.bun = ingredient;
      } else {
        state.constructorItems.ingredients.push({
          ...ingredient,
          id: ingredient._id
        });
      }
    }
  },

  // функция(builder)
  extraReducers: (builder) => {
    // addCase(арг1, арг2)
    // арг1 - санка[одно из состояние (pending, fulfiled, rejected)]
    // арг2 - функция (state, action) => state.isError = true
    builder.addCase(getIngredients.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getIngredients.fulfilled,
      (state: Draft<IState>, action: PayloadAction<TIngredient[]>) => {
        // {type: 'bun'}
        // action = {type, payload}
        state.ingredients = action.payload;
        state.buns = action.payload.filter(
          (ingredient) => ingredient.type === 'bun'
        );
        state.mains = action.payload.filter(
          (ingredient) => ingredient.type === 'main'
        );
        state.sauces = action.payload.filter(
          (ingredient) => ingredient.type === 'sauce'
        );
        state.isLoading = false;
      }
    );
  }
});

export const { addIngredient } = ingredientsSlice.actions;

export default ingredientsSlice;
