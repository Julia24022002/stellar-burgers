import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReduser } from './Slices/ingredientsSlice';
import { feedReducer } from './Slices/feedSlice';
import { constructorReducer } from './Slices/constructorBurgerSlice';
import { userReducer } from './Slices/userSlice';
import { orderListReducer } from './Slices/orderListSlice';
import { orderReducer } from './Slices/orderSlice';

// Корневой редьюсер с комбайном
const rootReducer = combineReducers({
  ingredient: ingredientsReduser,
  feed: feedReducer,
  burgerConstructor: constructorReducer,
  user: userReducer,
  orderList: orderListReducer,
  order: orderReducer
});
export default rootReducer;
