import { Routes, Route, useLocation } from 'react-router-dom';
import {
  ConstructorPage,
  Feed,
  ForgotPassword,
  Login,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';

import { useEffect } from 'react';
import { fetchIngredients } from '../../services/slices/ingredients';
import { useDispatch } from '../../services/store';

const App = () => {
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const onClose = () => window.history.back();
  const dispatch = useDispatch();

  useEffect(() => {
    //LOG
    console.log('Загрузка ингредиентов...');
    dispatch(fetchIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='*' element={<NotFound404 />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/profile/orders/:number' element={<OrderInfo />} />
      </Routes>

      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингридиента' onClose={onClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          {/* <Route
            path='/feed/:number'
            element={
              <Modal
                title=''
                onClose={onClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <Modal
                title=''
                onClose={onClose}
              >
                <OrderInfo />
              </Modal>
            }
          /> */}
        </Routes>
      )}
    </div>
  );
};

export default App;
