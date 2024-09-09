import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Draft, //для типизация стейтов
  isAction
} from '@reduxjs/toolkit';
import { getFeedsApi, getOrdersApi, orderBurgerApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types'; //?
import { getOrderByNumberApi } from '@api';

interface IState {
  isLoading: boolean;
  isError: boolean;
  userOrders: TOrder[];
  orders: TOrder[];
  orderData: TOrder | null;
}
//1. Идет фетч запрос через функцию
//2. Работаем с слайсом

const initialState: IState = {
  isLoading: false,
  isError: false,
  userOrders: [],
  orderData: null,
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

export const getOrderInfo = createAsyncThunk(
  'feed/getOrderInfo',
  async (number: number) => getOrderByNumberApi(number)
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
      state.userOrders = action.payload; // {success, orders, total, totalDay}
      state.isLoading = false;
    });
    builder.addCase(getOrderInfo.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getOrderInfo.fulfilled, (state, action) => {
      // state.userOrders = action.payload; // {success, orders[0]  }
      state.orderData = action.payload.orders[0];
      state.isLoading = false;
    });
  }
});

export default feedsSlice;
