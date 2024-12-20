import { expect } from '@jest/globals';
import {
  addBun,
  addIngredient,
  removeIngredient,
  moveIngredientDown,
  moveIngredientUp,
  clearConstructor,
  TConstructorState,
  initialState,
  constructorReducer
} from './constructorBurgerSlice';

describe('тестирование constructorReducer', () => {
  const bunConstructor = {
    id: '643d69a5c3f7b9001cfa093c',
    _id: '643d69a5c3f7b9001cfa093c',
    calories: 420,
    carbohydrates: 53,
    fat: 24,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    name: 'Краторная булка N-200i',
    price: 1255,
    proteins: 80,
    type: 'bun',
    __v: 0
  };

  const mainConstructor = {
    calories: 4242,
    carbohydrates: 242,
    fat: 142,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    name: 'Биокотлета из марсианской Магнолии',
    price: 424,
    proteins: 420,
    type: 'main',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa0941',
    id: '643d69a5c3f7b9001cfa0941'
  };
  const sauceConstructor = {
    calories: 14,
    carbohydrates: 11,
    fat: 22,
    image: 'https://code.s3.yandex.net/react/code/sauce-04.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-04-large.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-04-mobile.png',
    name: 'Соус фирменный Space Sauce',
    price: 80,
    proteins: 50,
    type: 'sauce',
    __v: 0,
    _id: '643d69a5c3f7b9001cfa0943',
    id: '643d69a5c3f7b9001cfa0943'
  };

  test('тестирование начального состояния', () => {
    expect(constructorReducer(undefined, { type: '' })).toEqual(initialState);
  });
  test('тестирование addBun(добавить булочку)', () => {
    expect(constructorReducer(initialState, addBun(bunConstructor))).toEqual({
      ...initialState,
      bun: bunConstructor
    });
  });

  test('тестирование addIngredient(добавить ингредиент)', () => {
    const newState = constructorReducer(
      initialState,
      addIngredient(mainConstructor)
    );
    const expectedMain = { ...mainConstructor, id: newState.ingredients[0].id };
    expect(newState.ingredients[0]).toMatchObject(expectedMain);
  });

  test('тестирование removeIngredient(удалить ингредиент)', () => {
    const initialStateWithIngredients = {
      ...initialState,
      ingredients: [mainConstructor]
    };

    const newState = constructorReducer(
      initialStateWithIngredients,
      removeIngredient(mainConstructor.id)
    );
    expect(newState.ingredients).toHaveLength(0);
  });

//   test('тестирование moveIngredientDown(переместить ингредиент вниз) ', () => {
//     const initialStateWithIngredients = {
//       ...initialState,
//       ingredients: [mainConstructor, sauceConstructor]
//     };

//     const newState = constructorReducer(
//       initialStateWithIngredients,
//       moveIngredientDown(mainConstructor._id)
//     );
//     expect(newState.ingredients).toEqual([sauceConstructor, mainConstructor]);
//   });

//   test('тестирование moveIngredientUp(переместить ингредиент вверх)', () => {
//     const initialStateWithIngredients = {
//       ...initialState,
//       ingredients: [sauceConstructor, mainConstructor]
//     };
//     const newState = constructorReducer(
//       initialStateWithIngredients,
//       moveIngredientUp(mainConstructor.id)
//     );
//     expect(newState.ingredients).toEqual([mainConstructor, sauceConstructor]);
//   });

  test('тестирование clearConstructor(очистить конструктор)', () => {
    const initialStateWithBunAndIngredients = {
      ...initialState,
      bun: bunConstructor,
      ingredients: [mainConstructor, sauceConstructor]
    };
    const newState = constructorReducer(
      initialStateWithBunAndIngredients,
      clearConstructor()
    );
    expect(newState).toEqual(initialState);
  });
});
