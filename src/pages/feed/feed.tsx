import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { feedSelectors, fetchFeed } from '../../services/slices/feeds/feeds';
import { useDispatch } from '../../services/store';

export const Feed: FC = () => {
  /** +++TODO: взять переменную из стора */
  const orders = useSelector(feedSelectors.getOrders);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeed());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeed());
  };

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
