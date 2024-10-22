import { useSelector, useDispatch, RootState } from '../../services/store';
import { getIngredients } from '../../services/slices/ingredients-slice';
import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import ingredientsSlice from '../../services/slices/ingredients-slice';
import { useNavigate } from 'react-router-dom';

export const ConstructorPage: FC = () => {
  /** TODO: взять переменную из стора */
  const isIngredientsLoading = false;
  const ingredientStore = useSelector((state) => state.ingredients);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState([
    { id: 0, text: '', name: 'address' },
    { id: 0, text: '', name: 'email' },
    { id: 1, text: '', name: 'phone' },
    { id: 1, text: '', name: 'name' }
  ]);

  const [index, setIndex] = useState(0);
  const filtredInputs = inputs.filter((input) => input.id === index);

  function setData(name: string, text: string) {
    const newInputs = inputs.map((input) => {
      if (input.name === name) {
        input.text = text;
        return input;
      }
      return input;
    });

    setInputs(newInputs);
  }
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

          <form action=''>
            {filtredInputs.map((input) => (
              <input
                placeholder={input.name}
                onInput={(event: ChangeEvent<HTMLInputElement>) =>
                  setData(event.target.name, event.target.value)
                }
                key={input.name}
                name={input.name}
              />
            ))}

            <button onClick={() => setIndex(index + 1)} type='button'>
              next
            </button>
          </form>

          <p>{JSON.stringify(inputs)}</p>
        </main>
      )}
    </>
  );
};
