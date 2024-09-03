import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Draft //для типизация стейтов
} from '@reduxjs/toolkit';
import { getFeedsApi } from '@api';
import { TOrder, TOrdersData } from '@utils-types'; //?

interface IState {
  isLoading: boolean;
  isError: boolean;
  orders: TOrder[];
}
//1. Идет фетч запрос через функцию
//2. Работаем с слайсом

const initialState: IState = {
  isLoading: false,
  isError: false,
  orders: [] // never [] - всегда пустой
};

export const getFeeds = createAsyncThunk('feed/getFeedsApi', async () =>
  getFeedsApi()
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
  }
});

export default feedsSlice;
