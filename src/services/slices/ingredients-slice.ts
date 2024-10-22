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
  ingredientData: TIngredient | null;
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
  ingredientData: null,
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
          id: `${Date.now()}`
        });
      }
    },
    // action.payload = 10
    deleteIngredient(state, action: PayloadAction<string>) {
      // if колбек возвращает true => элемент останется, else => удаляет
      state.constructorItems.ingredients =
        state.constructorItems.ingredients.filter(
          (ingredient) => ingredient.id !== action.payload
        );
    },
    //
    findIndegredient(state, action: PayloadAction<string>) {
      const foundIngredient = state.ingredients.find(
        (ingredient) => ingredient._id === action.payload
      ); // [{}]

      if (foundIngredient) {
        state.ingredientData = foundIngredient;
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

    builder.addCase(getIngredients.rejected, (state) => {
      state.isError = true;
    });
  }
});

// все эти фукнции помещаем в dispatch
export const { addIngredient, deleteIngredient, findIndegredient } =
  ingredientsSlice.actions;

export default ingredientsSlice;

// 1. Сформировать особенный url в роутинг - www.localhost:4000/ingredients/234238dgikwddvksdv  path: '/:id'
// 2. Внутри компонента самой страницы мы динамический параметр в переменную
// 3. useEffect(() => {
//    const ingredient = getIngrednientIfno('234238dgikwddvksdv')   // fetch('backend.com/users') {name, calories, bun, mains}
//  },[])

// 4. <h1>{ingredient.name}</h1>
// 5. <p>{ingredient.calories}</p>
