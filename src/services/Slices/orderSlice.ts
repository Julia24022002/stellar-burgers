import { TOrder } from '@utils-types';
import { orderBurgerApi, getOrderByNumberApi } from '../../utils/burger-api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

//тип начальное состояние
type TOrderState = {
  order: TOrder | null;
  orderRequest: boolean;
};

//   нач состояние
export const initialState: TOrderState = {
  order: null,
  orderRequest: false
};

export const orderBurger = createAsyncThunk(
  'order/orderBurger',
  async (data: string[], { dispatch }) => {
    dispatch(clearOrder());
    const dataOrder = await orderBurgerApi(data);
    return dataOrder;
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/getOrderByNumber',
  async (numberOrder: number, { dispatch }) => {
    dispatch(clearOrder());
    return getOrderByNumberApi(numberOrder);
  }
);

// слайс
export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => (state = initialState)
  },
  selectors: {
    selectOrder: (state) => state.order,
    selectOrderRequest: (state) => state.orderRequest
  },
  extraReducers: (builder) => {
    builder
      .addCase(orderBurger.pending, (state) => {
        state.orderRequest = true;
      })

      .addCase(orderBurger.rejected, (state, action) => {
        state.orderRequest = false;
      })

      .addCase(orderBurger.fulfilled, (state, action) => {
        state.orderRequest = false;
        state.order = action.payload.order;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export const { selectOrder, selectOrderRequest } = orderSlice.selectors;
export const orderReducer = orderSlice.reducer;
