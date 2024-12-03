import { getFeedsApi } from '../../utils/burger-api';
import { TOrder } from '@utils-types';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export interface IFeedState {
  feeds: TOrder[];
  total: number | null;
  totalToday: number | null;
  error: string | null;
}

export const initialState: IFeedState = {
  feeds: [],
  total: null,
  totalToday: null,
  error: null
};

export const getFeeds = createAsyncThunk('orders/getFeeds', async () => {
  const response = await getFeedsApi();
  return response;
});

// слайс
export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  selectors: {
    selectFeedsState: (state) => state.feeds,
    selectFeedsTotal: (state) => state.total,
    selectFeedsTotalToday: (state) => state.totalToday
  },
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.feeds = [];
        state.total = null;
        state.totalToday = null;
        state.error = null;
      })

      .addCase(getFeeds.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка получения данных';
      })

      .addCase(getFeeds.fulfilled, (state, action) => {
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});
export const feedReducer = feedsSlice.reducer;
export const { selectFeedsState, selectFeedsTotal, selectFeedsTotalToday } =
  feedsSlice.selectors;
