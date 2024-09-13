import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getOrders } from '../../services/slices/feed-slice';
export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  const ordersSlice = useSelector((state) => state.feed);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  // 1. Нам нужно иметь доступ до переменных из стора (useSelector)
  // 1.1 Нам нужно иметь возможность запускать функции из стора (useDipatch)

  // 2. После того, как наша страница полностью прогрузиться (useEffect), задиспатчилась санка, делающая запрос на получение всех наших заказов

  return <ProfileOrdersUI orders={ordersSlice.userOrders} />;
};
