import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import { findIndegredient } from '../../services/slices/ingredients-slice';
export const IngredientDetails: FC = () => {
  // vk.com/dantum
  const params = useParams(); // () => {nickname: 'dantum'}
  /** TODO: взять переменную из стора */
  const store = useSelector((state) => state.ingredients);

  // findIndegredient
  const dispatch = useDispatch();

  useEffect(() => {
    const id = params.id;

    if (id) {
      dispatch(findIndegredient(id));
    }
  }, []);

  // useEffect(() => {
  //   console.log(params.id);
  // }, []);
  if (!store.ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={store.ingredientData} />;
};
