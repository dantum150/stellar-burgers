import { FC } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useSelector } from '../../services/store';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** TODO: взять переменные из стора */
  const ordersStore = useSelector((state) => state.feed);

  const orders: TOrder[] = [];
  const feed = {
    total: ordersStore.total,
    totalToday: ordersStore.totalToday
  }; // {total:, totalToday:}

  const readyOrders = getOrders(ordersStore.orders, 'done');

  const pendingOrders = getOrders(ordersStore.orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
