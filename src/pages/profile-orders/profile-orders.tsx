import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { fetchOrders, orderSelectors } from '../../services/slices/order/order';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  /** +++TODO: взять переменную из стора */
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const orders = useSelector(orderSelectors.getAllOrders);

  return <ProfileOrdersUI orders={orders} />;
};
