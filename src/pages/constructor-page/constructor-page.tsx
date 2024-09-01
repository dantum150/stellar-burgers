import { useSelector, useDispatch, RootState } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients-slice';
import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import ingredientsSlice from '../../services/slices/ingredients-slice';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = false;
  const ingredientStore = useSelector((state) => state);
  const dispatch = useDispatch();

  // dispatch(action() || thunks())
  console.log(ingredientStore);
  useEffect(() => {
    dispatch(getIngredients());
  }, []);

  return (
    <>
      {isIngredientsLoading ? (
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
