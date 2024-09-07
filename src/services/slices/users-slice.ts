import { registerUserApi, TLoginData } from '@api';
import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
  Draft //для типизация стейтов
} from '@reduxjs/toolkit';
import { TRegisterData, loginUserApi } from '@api';
import { setCookie } from '../../utils/cookie';
import { forgotPasswordApi } from '@api';

export const registerUser = createAsyncThunk(
  'users/registerUser',
  async (userInfo: TRegisterData) => registerUserApi(userInfo)
);

function saveTokens(accessToken: string, refreshToken: string) {
  localStorage.setItem('refreshToken', refreshToken);
  setCookie('accessToken', accessToken);
}

export const loginUser = createAsyncThunk(
  'users/loginuser',
  async (useInfo: TLoginData) => {
    const userData = await loginUserApi(useInfo); // {accessToken, refreshToken, user: {name, email}}
    return userData;
  }
);

export const forgotPassword = createAsyncThunk(
  'users/forgotPassword',
  async (userInfo: { email: string }) => forgotPasswordApi(userInfo)
);

const initialState = {
  isAuthChecked: false,
  isLoading: false,
  error: '',
  user: {
    name: '',
    email: ''
  }
};

const usersSlice = createSlice({
  name: 'users',
  initialState: initialState,
  // объект из "синхронных" функций
  reducers: {},
  // функция с параметром builder
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      console.log(action.payload);
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Произошла ошибка, попробуйте позже';
      console.log(action.payload);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = 'Неверный логин или пароль';
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      saveTokens(action.payload.accessToken, action.payload.refreshToken);
      state.user = action.payload.user;
      state.isLoading = false;
    });
  }
});

export default usersSlice;