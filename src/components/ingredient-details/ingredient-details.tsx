import { FC } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from '../../services/store';
import { useSelector } from '../../services/store';
import {
  findIndegredient,
  getIngredients
} from '../../services/slices/ingredients-slice';
import { useLocation } from 'react-router-dom';
export const IngredientDetails: FC = () => {
  // vk.com/dantum
  const params = useParams(); // () => {nickname: 'dantum'}
  /** TODO: взять переменную из стора */
  const store = useSelector((state) => state.ingredients);

  const location = useLocation();
  // findIndegredient
  const dispatch = useDispatch();

  async function getIngredient() {
    const id = params.id;
    await dispatch(getIngredients());

    if (id) {
      dispatch(findIndegredient(id));
    }
  }

  useEffect(() => {
    getIngredient();
  }, []);

  // useEffect(() => {
  //   console.log(params.id);
  // }, []);
  if (!store.ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={store.ingredientData} />;
};
