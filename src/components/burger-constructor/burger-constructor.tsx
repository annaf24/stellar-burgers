import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import {
  constructorActions,
  constructorSelectors
} from '../../services/slices/burger-constructor';
import {
  createOrder,
  orderActions,
  orderSelectors
} from '../../services/slices/order';
import { profileSelectors } from '../../services/slices/profile';
import { useLocation, useNavigate } from 'react-router-dom';

export const BurgerConstructor: FC = () => {
  /** +++TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  // const constructorItems = {
  //   bun: {
  //     price: 0
  //   },
  //   ingredients: []
  // };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const location = useLocation();

  const constructorItems = useSelector(
    constructorSelectors.getConstructorItems
  );
  console.log('Current constructor items:', constructorItems);
  const orderRequest = useSelector(orderSelectors.getOrderRequest);
  const orderModalData = useSelector(orderSelectors.getOrder);
  const userData = useSelector(profileSelectors.selectUser);

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!userData) {
      navigate('/login');
      return;
    }

    const ingredientsIds = [
      constructorItems.bun._id,
      ...constructorItems.ingredients.map((i) => i._id),
      constructorItems.bun._id
    ];

    dispatch(createOrder(ingredientsIds));
  };

  const closeOrderModal = () => {
    dispatch(constructorActions.resetConstructor());
    dispatch(orderActions.clearOrderData());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;
  //LOG
  console.log('constructorItems:', constructorItems);
  console.log('orderRequest:', orderRequest);
  console.log('orderModalData:', orderModalData);

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
