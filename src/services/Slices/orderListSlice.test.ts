import { expect } from '@jest/globals';
import {
  initialState,
  getOrdersList,
  orderListReducer
} from './orderListSlice';

describe('тестирование orderListReducer', () => {
  const mockOrderList = [
    {
      _id: '6740c650b27b06001c3e9d07',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941',
        '643d69a5c3f7b9001cfa093d'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-11-22T17:58:40.195Z',
      updatedAt: '2024-11-22T17:58:41.214Z',
      number: 60135
    },
    {
      _id: '6740c589b27b06001c3e9d03',
      ingredients: [
        '643d69a5c3f7b9001cfa093d',
        '643d69a5c3f7b9001cfa093e',
        '643d69a5c3f7b9001cfa0941'
      ],
      status: 'done',
      name: 'Флюоресцентный люминесцентный био-марсианский бургер',
      createdAt: '2024-11-22T17:55:21.081Z',
      updatedAt: '2024-11-22T17:55:22.288Z',
      number: 60134
    }
  ];

  test('тестировние getOrdersList.pending', () => {
    const action = { type: getOrdersList.pending.type };
    const newState = orderListReducer(initialState, action);
    expect(newState).toEqual(initialState);
  });

  test('тестирование getOrdersList.fulfilled', () => {
    const action = {
      type: getOrdersList.fulfilled.type,
      payload: mockOrderList
    };
    const expectedResult = { ...initialState, orders: mockOrderList };
    const newState = orderListReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });

  test('тестирование getOrdersList.rejected', () => {
    const errorMessage = 'Ошибка загрузки ингредиентов';
    const action = {
      type: getOrdersList.rejected.type,
      error: { message: errorMessage }
    };
    const expectedResult = {
      ...initialState,
      error: errorMessage
    };
    const newState = orderListReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
