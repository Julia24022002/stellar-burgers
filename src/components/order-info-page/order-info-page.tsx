import { FC, useMemo, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';

import { useDispatch, useSelector } from '../../services/store';
import { orderByNumber, selectOrder } from '../../services/Slices/orderSlice';
import { selectIngredients } from '../../services/Slices/ingredientsSlice';
import styles from './order-info-page.module.css';
import { useLocation } from 'react-router-dom';

export const OrderInfoPage: FC = () => {
  const orderData = useSelector(selectOrder);
  const ingredients: TIngredient[] = useSelector(selectIngredients);
  const dispatch = useDispatch();
  const { number } = useParams();
  const location = useLocation();
  const orderId = location.pathname.match(/\d+/);

  useEffect(() => {
    if (number) {
      dispatch(orderByNumber(Number(number)));
    }
  }, [dispatch]);

  /* им данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return (
    <div className={styles.wrapper}>
      <h3 className='text text_type_main-medium  pb-3 pt-10'>#{orderId}</h3>
      <OrderInfoUI orderInfo={orderInfo} />;{' '}
    </div>
  );
};
