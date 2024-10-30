import { FC, useMemo } from 'react';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useSelector, useDispatch } from '../../services/store';
import {
  closeModal,
  createOrder,
  resetOrderInfo
} from '../../services/slices/feed-slice';
import { resetConstructorItems } from '../../services/slices/ingredients-slice';
import { useNavigate } from 'react-router-dom';
export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  // useSelector(колбек)
  // колбек = (state) => state.название слайса
  const ingredientsStore = useSelector((state) => state.ingredients);
  const userStore = useSelector((state) => state.users);
  const orderStore = useSelector((state) => state.feed);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = ingredientsStore.constructorItems;

  const orderModalData = null;

  function getIdsFromIgredients(bun: TIngredient, ingredients: TIngredient[]) {
    const bunId = bun._id; // 1
    const ingredientsIds = ingredients.map((ingredient) => ingredient._id);
    return [bunId, bunId, ...ingredientsIds];
  }

  const onOrderClick = () => {
    if (!constructorItems.bun || orderStore.orderRequest) return;
    if (!userStore.isAuthChecked) {
      navigate('/login');
      return;
    }
    const ids = getIdsFromIgredients(
      constructorItems.bun,
      constructorItems.ingredients
    );
    dispatch(createOrder(ids))
      .then(() => dispatch(resetConstructorItems()))
      .catch((e) => console.log(e));
  };
  const closeOrderModal = () => {
    dispatch(closeModal());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [ingredientsStore.constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderStore.orderRequest}
      constructorItems={ingredientsStore.constructorItems}
      orderModalData={orderStore.orderData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
