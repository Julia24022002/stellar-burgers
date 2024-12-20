import { expect } from '@jest/globals';
import {
  initialState,
  orderBurger,
  orderByNumber,
  orderReducer
} from './orderSlice';

describe('тестирование orderReducer', () => {
  const mockOrderNumber = {
    success: true,
    orders: [
      {
        _id: '67634ad9750864001d372803',
        ingredients: [
          '643d69a5c3f7b9001cfa093d',
          '643d69a5c3f7b9001cfa0943',
          '643d69a5c3f7b9001cfa0945',
          '643d69a5c3f7b9001cfa093d'
        ],
        owner: '6761f57a750864001d3721b0',
        status: 'done',
        name: 'Space флюоресцентный антарианский бургер',
        createdAt: '2024-12-18T22:21:13.289Z',
        updatedAt: '2024-12-18T22:21:14.100Z',
        number: 63338,
        __v: 0
      }
    ]
  };

  const mockOrder = {
    success: true,
    name: 'Флюоресцентный люминесцентный бургер',
    order: {
      _id: '67416ffab27b06001c3e9fc3',
      ingredients: [
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093e',
          name: 'Филе Люминесцентного тетраодонтимформа',
          type: 'main',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/meat-03.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/meat-03-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/meat-03-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa0942',
          name: 'Соус Spicy-X',
          type: 'sauce',
          proteins: 30,
          fat: 20,
          carbohydrates: 40,
          calories: 30,
          price: 90,
          image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
          image_large:
            'https://code.s3.yandex.net/react/code/sauce-02-large.png',
          __v: 0
        },
        {
          _id: '643d69a5c3f7b9001cfa093d',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0
        }
      ],
      number: 60185,
      price: 3054
    }
  };

  //   orderBurger
  test('тестирование orderBurger.pending ', () => {
    const action = { type: orderBurger.pending.type };
    const expectedResult = {
      ...initialState,
      orderRequest: true
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование orderBurger.fulfilled', () => {
    const action = {
      type: orderBurger.fulfilled.type,
      payload: mockOrder
    };
    const expectedResult = {
      ...initialState,
      order: mockOrder.order
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование orderBurger.rejected', () => {
    const errorMessage = 'ошибка получения данных';
    const action = {
      type: orderBurger.rejected.type,
      error: { message: errorMessage }
    };
    const expectedResult = {
      ...initialState,
      error: errorMessage,
      orderRequest: false
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });

  //   orderByNumber;
  test('тестирование orderByNumber.pending', () => {
    const action = { type: orderByNumber.pending.type };
    const expectedResult = {
      ...initialState,
      orderRequest: true
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование orderByNumber.fulfilled', () => {
    const action = {
      type: orderByNumber.fulfilled.type,
      payload: mockOrderNumber
    };
    const expectedResult = {
      ...initialState,
      order: mockOrderNumber.orders[0],
      orderRequest: false
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование orderByNumber.rejected', () => {
    const errorMessage = 'ошибка получения данных';
    const action = {
      type: orderByNumber.rejected.type,
      error: { message: errorMessage }
    };
    const expectedResult = {
      ...initialState,
      error: errorMessage,
      orderRequest: false
    };
    const newState = orderReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
