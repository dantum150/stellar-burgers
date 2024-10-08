import { configureStore } from '@reduxjs/toolkit';
import feedsSlice, { getFeeds, getOrderInfo, getOrders } from './feed-slice';
const createTestStore = () =>
  configureStore({
    reducer: {
      feed: feedsSlice.reducer
    }
  });

describe('feedSlice', () => {
  let initialState: any;
  let store: ReturnType<typeof createTestStore>;

  beforeEach(() => {
    store = createTestStore();
  });

  beforeEach(() => {
    initialState = {
      isLoading: false,
      isError: false,
      orderRequest: false,
      userOrders: [],
      orderData: null,
      orders: [],
      total: 0,
      totalToday: 0
    };
  });

  it('проверка состояния pending', () => {
    expect(store.getState().feed.isLoading).toBe(false);

    store.dispatch(getFeeds.pending('', undefined));

    expect(store.getState().feed.isLoading).toBe(true);
  });

  it('проверка состояния rejected', () => {
    expect(store.getState().feed.isLoading).toBe(false);
    expect(store.getState().feed.isError).toBe(false);

    const errorMessage = 'Failed to fetch ingredients';
    //@ts-ignore
    store.dispatch(getOrders.rejected(new Error(errorMessage), '', undefined));

    const state = store.getState().feed;
    expect(state.isLoading).toBe(false);

    expect(state.isError).toBe(true);
  });

  it('проверка состояния fulfilled', () => {
    const mockIngredients = [
      {
        _id: 'string',
        status: 'string',
        name: 'string',
        createdAt: 'string',
        updatedAt: 'string',
        number: 12,
        ingredients: ['string']
      }
    ];

    //@ts-ignore
    store.dispatch(getOrders.fulfilled(mockIngredients, '', undefined));

    const state = store.getState().feed;

    expect(state.isLoading).toBe(false);

    expect(state.userOrders).toEqual(mockIngredients);
  });
});
