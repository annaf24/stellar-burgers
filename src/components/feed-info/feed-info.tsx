import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import { feedSelectors, fetchFeed } from '../../services/slices/feeds/feeds';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  /** +++TODO: взять переменные из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, []);

  const orders = useSelector(feedSelectors.getOrders);

  const feed = {
    total: useSelector(feedSelectors.getTotal),
    totalToday: useSelector(feedSelectors.getTotalToday)
  };

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
