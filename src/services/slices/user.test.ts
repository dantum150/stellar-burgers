import { configureStore } from '@reduxjs/toolkit';
import usersSlice, { getUserInfo } from './users-slice';
const createTestStore = () =>
  configureStore({
    reducer: {
      user: usersSlice.reducer
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
      isAuthChecked: false,
      isLoading: false,
      error: '',
      user: {
        name: '',
        email: ''
      }
    };
  });

  it('проверка состояния pending', () => {
    expect(store.getState().user.isLoading).toBe(false);

    store.dispatch(getUserInfo.pending('', undefined));

    expect(store.getState().user.isLoading).toBe(true);
  });

  it('проверка состояния rejected', () => {
    expect(store.getState().user.isLoading).toBe(false);
    expect(store.getState().user.isError).toBe(false);

    const errorMessage = 'Failed to fetch ingredients';
    //@ts-ignore
    store.dispatch(
      getUserInfo.rejected(new Error(errorMessage), '', undefined)
    );

    const state = store.getState().user;

    expect(state.isLoading).toBe(false);

    expect(state.isError).toBe(true);
  });

  it('проверка состояния fulfilled', () => {
    const mockIngredients = {
      success: true,
      user: {
        name: 'John',
        email: 'john@mail.ru'
      }
    };

    //@ts-ignore
    store.dispatch(getUserInfo.fulfilled(mockIngredients, '', undefined));

    const state = store.getState().user;

    expect(state.isLoading).toBe(false);

    expect(state.user).toEqual(mockIngredients.user);
  });
});
