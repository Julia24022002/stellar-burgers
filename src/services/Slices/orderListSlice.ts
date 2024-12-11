import { TOrder } from '@utils-types';
import { getOrdersApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
// import { selectOrders } from './feedSlice';

type TOrdersState = {
  orders: TOrder[];
  error: string | null;
};

export const initialState: TOrdersState = {
  orders: [],
  error: null
};

export const getOrdersList = createAsyncThunk('orders/getOrders', async () => {
  const orders = await getOrdersApi();
  return orders;
});

// слайс
export const orderListSlice = createSlice({
  name: 'orderList',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersList: (state) => state.orders,
    selectOrdersError: (state) => state.error
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrdersList.pending, (state) => {
        state.error = null;
      })

      .addCase(getOrdersList.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка загрузки ингредиентов';
      })

      .addCase(getOrdersList.fulfilled, (state, action) => {
        state.orders = action.payload;
      });
  }
});
export const orderListReducer = orderListSlice.reducer;
export const { selectOrdersList, selectOrdersError } = orderListSlice.selectors;
