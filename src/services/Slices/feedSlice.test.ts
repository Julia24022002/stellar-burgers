import { expect } from '@jest/globals';
import { feedReducer, getFeeds, initialState } from './feedSlice';

describe('тестирование feedReducer', () => {
  const mockFeedsOrders = {
    orders: [
      {
        id: '6740c650b27b06001c3e9d07',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941',
          '643d69a5c3f7b9001cfa093d'
        ],
        status: 'done',
        name: 'Флюоресцентный бургер',
        createdAt: '2024-11-22T17:58:40.195Z',
        updatedAt: '2024-11-22T17:58:41.214Z',
        number: 60037
      },
      {
        id: '6740c589b27b06001c3e9d03',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa093e',
          '643d69a5c3f7b9001cfa0941'
        ],
        status: 'done',
        name: 'Флюоресцентный люминесцентный био-марсианский бургер',
        createdAt: '2024-11-22T17:55:21.081Z',
        updatedAt: '2024-11-22T17:55:22.288Z',
        number: 60038
      }
    ],
    total: 30234,
    totalToday: 230
  };

  test('тестирование getFeeds.pending', () => {
    const action = { type: getFeeds.pending.type };
    const expectedState = { ...initialState, isLoading: true, error: null };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('тестирование getFeeds.fulfilled', () => {
    const action = { type: getFeeds.fulfilled.type, payload: mockFeedsOrders };
    const expectedState = {
      ...initialState,
      feeds: mockFeedsOrders.orders,
      total: mockFeedsOrders.total,
      totalToday: mockFeedsOrders.totalToday,
      isLoading: false,
      error: null
    };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('тестирование getFeeds.rejected', () => {
    const errorMessage = 'Network Error';
    const action = {
      type: getFeeds.rejected.type,
      error: { message: errorMessage }
    };
    const expectedState = {
      ...initialState,
      error: errorMessage,
      isLoading: false
    };
    const newState = feedReducer(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
