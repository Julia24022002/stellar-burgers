import  rootReducer  from './rootReducer';
import store from './store';
import { expect} from '@jest/globals';

describe('тестирование rootReducer', () => {
  test('тест rootReducer', () => {
    const anotherState = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(store.getState()).toEqual(anotherState);
  });
});