import { FC, useDebugValue, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { getOrderInfo } from '../../services/slices/feed-slice';
import { getIngredients } from '../../services/slices/ingredients-slice';
export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */

  // 1. В историю заказов Заказ с номером 124123
  // 2. По нему кликаем
  // 3. OrderData = вся инфа о заказе с номером 124123
  // 4. Запрос на бэк для получения инфы о заказе с номером 124123

  // 1. В первую очередь нам нужно номер заказа из url браузера   www.localhost/profile/orders/:number
  // 2. Для извлечения дин.параметра есть специальная функция useParams() => {number: 124123}

  // 3. Задиспатчить санку, которая будет отправлять номер заказа в бэк, а получать из бэка будет инфу о заказе
  // 4. fulfiled => записываем всю инфу о заказе в слайсе в поле orderData

  const params = useParams(); // {number: 4654234} || null, undefined
  const orderSlice = useSelector((state) => state.feed);
  const ingredientsSlice = useSelector((state) => state.ingredients);

  const dispatch = useDispatch();
  const orderData = orderSlice.orderData;

  const ingredients: TIngredient[] = ingredientsSlice.ingredients;

  /* Готовим данные для отображения */
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

  async function getOrder(orderNumber: number) {
    await dispatch(getIngredients());
    await dispatch(getOrderInfo(orderNumber));
  }

  // getOrderInfo
  useEffect(() => {
    //@ts-ignore
    getOrder(params.number);
  }, []);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
