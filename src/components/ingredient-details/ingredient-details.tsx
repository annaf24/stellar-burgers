import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { ingredientsSelectors } from '../../services/slices/ingredients';
import { useSelector } from '../../services/store';

export const IngredientDetails: FC = () => {
  /** +++TODO: взять переменную из стора */
  const { id } = useParams();
  const ingredients = useSelector(ingredientsSelectors.getIngredients);
  const ingredientData = ingredients.find((item) => item._id === id);

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
