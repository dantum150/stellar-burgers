import { useSelector, useDispatch, RootState } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients-slice';
import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import ingredientsSlice from '../../services/slices/ingredients-slice';
import { useNavigate } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = false;
  const ingredientStore = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();

  // dispatch(action() || thunks())

  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      {ingredientStore.isLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
