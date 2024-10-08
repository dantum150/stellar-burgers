import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { getFeeds } from '../../services/slices/feed-slice';
import { getIngredients } from '../../services/slices/ingredients-slice';
export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const feedStore = useSelector((state) => state.feed);

  const dispatch = useDispatch();

  function onClick() {
    dispatch(getFeeds());
  }

  useEffect(() => {
    dispatch(getFeeds());
    dispatch(getIngredients());
  }, []);

  if (!feedStore.orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={feedStore.orders} handleGetFeeds={onClick} />;
};
