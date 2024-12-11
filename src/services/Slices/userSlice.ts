import { TUser } from '@utils-types';
import {
  getUserApi,
  loginUserApi,
  TLoginData,
  logoutApi,
  registerUserApi,
  TRegisterData,
  updateUserApi
} from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { setCookie } from '../../utils/cookie';

type TUserState = {
  isAuthChecked: boolean;
  user: TUser | null;
  loginRequest: boolean;
  // loading: boolean;
  error: string | null;
};

//   нач состояние
export const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  loginRequest: false,
  // loading: false,
  error: null
};

export const registrUser = createAsyncThunk(
  'user/registrUser',
  async (registerData: TRegisterData, { rejectWithValue }) => {
    const data = await registerUserApi(registerData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const loginUser = createAsyncThunk(
  'authUser/fetchLoginUser',
  async (loginData: TLoginData, { rejectWithValue }) => {
    const data = await loginUserApi(loginData);
    if (!data?.success) {
      return rejectWithValue(data);
    }
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const getUser = createAsyncThunk('user/getUser', async () => {
  const data = await getUserApi();
  return data.user;
});

export const updateUser = createAsyncThunk(
  'user/updateUser',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const logoutUser = createAsyncThunk('user/logoutUser', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '');
});

// слайс
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  selectors: {
    selectUser: (state) => state.user,
    selectIsAuthChecked: (state) => state.isAuthChecked
    // selectUserError: (state) => state.error
  },
  extraReducers: (builder) => {
    // регистрация
    builder
      .addCase(registrUser.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })

      .addCase(registrUser.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message || 'Ошибка регистрации';
      })

      .addCase(registrUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        // state.loading = false;
        state.error = null;
      });

    // вход
    builder
      .addCase(loginUser.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message || 'Ошибка входа';
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        // state.loading = false;
        state.error = null;
      });

    //   получение данных/проверка
    builder
      .addCase(getUser.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })

      .addCase(getUser.rejected, (state, action) => {
        // state.loading = false;
        state.error = action.error.message || 'Ошибка получения данных';
      })

      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload;
        // state.loading = false;
        state.error = null;
      });

    // обновление
    builder
      .addCase(updateUser.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })

      .addCase(updateUser.rejected, (state, action) => {
        // state.loading = false;
        state.error =
          action.error.message || 'Не удалось обновить пользователя';
      })

      .addCase(updateUser.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.user = action.payload.user;
        // state.loading = false;
        state.error = null;
      });

    // выход
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isAuthChecked = false;
      state.user = null;
      // state.loading = false;
      state.error = null;
    });
  }
});
export const { selectUser, selectIsAuthChecked } = userSlice.selectors;
export const userReducer = userSlice.reducer;
