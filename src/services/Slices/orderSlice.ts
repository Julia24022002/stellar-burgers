import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//тип начальное состояние
export interface TOrderState {
  order: TOrder | null;
  orderRequest: boolean;
  error: string | null;
}

//   нач состояние
export const initialState: TOrderState = {
  order: null,
  orderRequest: false,
  error: null
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[], { dispatch }) => {
    const dataOrder = await orderBurgerApi(data);
    dispatch(clearOrder());
    return dataOrder;
  }
);

export const orderByNumber = createAsyncThunk(
  'order/orderByNumber',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response;
  }
);

// слайс
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
    }
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка получения данных';
      })
      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      })
      .addCase(orderByNumber.pending, (state) => {
        state.orderRequest = true;
        state.error = null;
      })
      .addCase(orderByNumber.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.orders[0];
      })
      .addCase(orderByNumber.rejected, (state, action) => {
        state.orderRequest = false;
        state.error = action.error.message || 'Ошибка создания заказа';
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectOrder, selectOrderRequest } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
