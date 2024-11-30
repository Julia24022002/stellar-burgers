import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  selectConstructor,
  clearConstructor
} from '../../services/Slices/constructorBurgerSlice';
import { useNavigate } from 'react-router-dom';
import {
  selectUser,
  selectIsAuthChecked
} from '../../services/Slices/userSlice';
import {
  selectOrder,
  selectOrderRequest,
  orderBurger,
  clearOrder
} from '../../services/Slices/orderSlice';

export const BurgerConstructor: FC = () => {
  const constructorItems = useSelector(selectConstructor);
  const orderRequest = useSelector(selectOrderRequest);
  const orderModalData = useSelector(selectOrder);

  const isAuthChecked = useSelector(selectIsAuthChecked);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onOrderClick = () => {
    if (!isAuthChecked) {
      navigate('/login');
    } else if (constructorItems.bun && constructorItems.ingredients) {
      const order = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(orderBurger(order));
    }
  };

  const closeOrderModal = () => {
    navigate('/');
    dispatch(clearOrder());
    dispatch(clearConstructor());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
