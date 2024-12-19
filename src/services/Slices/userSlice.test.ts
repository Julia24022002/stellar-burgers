import { expect } from '@jest/globals';
import {
  initialState,
  registrUser,
  loginUser,
  getUser,
  updateUser,
  logoutUser,
  userReducer
} from './userSlice';

describe('тестирование userReducer', () => {
  const mockregistrUser = {
    email: 'test@mail.ru',
    name: 'user',
    password: '11111'
  };

  const mockloginUser = {
    email: 'test@mail.ru',
    password: '11111'
  };

  const mockupdateUser = {
    success: true,
    user: mockloginUser
  };

  const mockUser = {
    email: 'test@mail.ru',
    name: 'user'
  };

  // registrUser (регистрация)
  test('тестирование registrUser.pending ', () => {
    const action = { type: registrUser.pending.type };
    const expectedResult = {
      ...initialState,
      //   isLoading: true,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование registrUser.fulfilled', () => {
    const action = {
      type: registrUser.fulfilled.type,
      payload: mockregistrUser
    };
    const expectedResult = {
      ...initialState,
      //   isLoading: false,
      isAuthChecked: true,
      user: mockregistrUser,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование registrUser.rejected', () => {
    const errorMessage = 'ошибка регистрации';
    const action = {
      type: registrUser.rejected.type,
      error: { message: errorMessage }
    };
    const expectedResult = {
      ...initialState,
      error: errorMessage
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });

  // loginUser (вход)

  test('тестирование loginUser.pending ', () => {
    const action = { type: loginUser.pending.type };
    const expectedResult = {
      ...initialState,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование loginUser.fulfilled', () => {
    const action = {
      type: loginUser.fulfilled.type,
      payload: mockloginUser
    };
    const expectedResult = {
      ...initialState,
      isAuthChecked: true,
      user: mockloginUser,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование loginUser.rejected', () => {
    const errorMessage = 'ошибка входа';
    const action = {
      type: loginUser.rejected.type,
      error: { message: errorMessage }
    };
    const expectedResult = {
      ...initialState,
      error: errorMessage
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });

  // getUser(получение данных/проверка)

  test('тестирование getUser.pending ', () => {
    const action = { type: getUser.pending.type };
    const expectedResult = {
      ...initialState,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование getUser.fulfilled', () => {
    const action = {
      type: getUser.fulfilled.type,
      payload: mockloginUser
    };
    const expectedResult = {
      ...initialState,
      isAuthChecked: true,
      user: mockloginUser,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование getUser.rejected', () => {
    const errorMessage = 'ошибка получения данных';
    const action = {
      type: getUser.rejected.type,
      error: { message: errorMessage }
    };
    const expectedResult = {
      ...initialState,
      error: errorMessage
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });

  // updateUser(обновление)
  test('тестирование updateUser.pending ', () => {
    const action = { type: updateUser.pending.type };
    const expectedResult = {
      ...initialState,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const expectedResult = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
  test('тестирование updateUser.rejected', () => {
    const errorMessage = 'не удалось обновить пользователя';
    const action = {
      type: updateUser.rejected.type,
      error: { message: errorMessage }
    };
    const expectedResult = {
      ...initialState,
      error: errorMessage
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });

  // logoutUser(выход)
  test('тестирование logoutUser.fulfilled', () => {
    const action = {
      type: logoutUser.fulfilled.type
    };
    const expectedResult = {
      ...initialState,
      isAuthChecked: false,
      user: null,
      error: null
    };
    const newState = userReducer(initialState, action);
    expect(newState).toEqual(expectedResult);
  });
});
