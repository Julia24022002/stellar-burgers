import { expect } from '@jest/globals';
import {
  initialState,
  ingredientsReduser,
  getIngredients
} from './ingredientsSlice';
import { TIngredient } from '@utils-types';

describe('тестирование ingredientsReduser', () => {
  const mockIngredients: TIngredient[] = [
    {
      _id: '643d69a5c3f7b9001cfa093c',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
    },
    {
      _id: '643d69a5c3f7b9001cfa0941',
      name: 'Биокотлета из марсианской Магнолии',
      type: 'main',
      proteins: 420,
      fat: 142,
      carbohydrates: 242,
      calories: 4242,
      price: 424,
      image: 'https://code.s3.yandex.net/react/code/meat-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
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
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    }
  ];

  test('тестирование getIngredients.pending', () => {
    const action = { type: getIngredients.pending.type };
    const expectedState = { ...initialState, loading: true, error: null };
    const newState = ingredientsReduser(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('тестирование getIngredients.rejected', () => {
    const errorMessage = 'ошибка загрузки ингредиентов';
    const action = {
      type: getIngredients.rejected.type,
      error: { message: errorMessage }
    };
    const expectedState = {
      ...initialState,
      ingredients: [],
      error: errorMessage,
      loading: false
    };
    const newState = ingredientsReduser(initialState, action);
    expect(newState).toEqual(expectedState);
  });

  test('тестирование getIngredients.fulfilled', () => {
    const action = {
      type: getIngredients.fulfilled.type,
      payload: mockIngredients
    };
    const expectedState = {
      ...initialState,
      ingredients: mockIngredients,
      loading: false,
      error: null
    };
    const newState = ingredientsReduser(initialState, action);
    expect(newState).toEqual(expectedState);
  });
});
