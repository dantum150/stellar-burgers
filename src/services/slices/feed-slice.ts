import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Draft, //для типизация стейтов
  isAction
} from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types'; //?

interface IState {
  isLoading: boolean;
  isError: boolean;
  userOrders: TOrder[];
  orders: TOrder[];
}
//1. Идет фетч запрос через функцию
//2. Работаем с слайсом

const initialState: IState = {
  isLoading: false,
  isError: false,
  userOrders: [],
  orders: [] // never [] - всегда пустой
};

export const getFeeds = createAsyncThunk('feed/getFeedsApi', async () =>
  getFeedsApi()
);

export const getOrders = createAsyncThunk('feed/getOrders', async () =>
  getOrdersApi()
);

export const createOrder = createAsyncThunk(
  'feed/createOrder',
  async (ids: string[]) => orderBurgerApi(ids)
);

const feedsSlice = createSlice({
  name: 'feed',
  initialState: initialState,
  reducers: {}, // синхронная функция
  extraReducers: (builder) => {
    builder.addCase(getFeeds.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(
      getFeeds.fulfilled,
      (state: Draft<IState>, action: PayloadAction<TOrdersData>) => {
        state.orders = action.payload.orders;
      }
    );
    builder.addCase(getOrders.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrders.fulfilled, (state, action) => {
      //@ts-ignore
      state.userOrders = action.payload.orders; // {success, orders, total, totalDay}
      state.isLoading = false;
    });
  }
});

export default feedsSlice;
