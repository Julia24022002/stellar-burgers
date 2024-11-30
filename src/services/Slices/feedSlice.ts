import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IFeedState {
  orders: TOrder[];
  total: number | null;
  totalToday: number | null;
  error: string | null;
}

export const initialState: IFeedState = {
  orders: [],
  total: null,
  totalToday: null,
  error: null
};

export const getFeeds = createAsyncThunk('feed/fetchFeed', async () =>
  getFeedsApi()
);

// слайс
export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectOrdersState: (state) => state.orders,
    selectOrdersTotal: (state) => state.total,
    selectOrdersTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.orders = [];
        state.total = null;
        state.totalToday = null;
        state.error = null;
      })

      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка получения данных';
      })

      .addCase(getFeeds.fulfilled, (state, action) => {
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});
export const feedReducer = feedsSlice.reducer;
export const { selectOrdersState, selectOrdersTotal, selectOrdersTotalToday } =
  feedsSlice.selectors;
