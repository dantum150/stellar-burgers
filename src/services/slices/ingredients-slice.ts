import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Draft
} from '@reduxjs/toolkit';
import { getIngredientsApi } from '@api';
import { TIngredient } from '@utils-types';

// 1. Санки
// 2. Сам слайс

// 1. Для создания санок нам нужна createAsyncThunk(арг1, арг2)
// 1.1 Арг1 - 'ingredients/getIngredients'
// 1.2 Арг2 - функция, которая содержит фетч. Всё, что функция вернёт - это всё попадёт в action.payload

interface IState {
  isLoading: boolean;
  isError: boolean;
  ingredients: TIngredient[];
}

export const getIngredients = createAsyncThunk(
  'ingredients/getIngerdients',
  async () => getIngredientsApi()
);

// name - существительное, initialState, reducers
const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    isLoading: false,
    isError: false,
    ingredients: []
  },
  reducers: {},

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
        // action = {type, payload}
        (state.isLoading = false), (state.ingredients = action.payload);
      }
    );
  }
});

export default ingredientsSlice;
