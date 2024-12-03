import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { selectIngredients } from '../../services/Slices/ingredientsSlice';
import { useSelector } from '../../services/store';
import styles from './Ingredient-details-page.module.css';

export const IngredientDetailsPage: FC = () => {
  const { id } = useParams();
  const ingredientData = useSelector(selectIngredients).find(
    (ingredient) => ingredient._id === id
  );

  if (!ingredientData) {
    return <Preloader />;
  }
  return (
    <div className={styles.wrapper}>
      <h3 className='text text_type_main-large mb-4'>Детали ингредиента</h3>
      <IngredientDetailsUI ingredientData={ingredientData} />
    </div>
  );
};
