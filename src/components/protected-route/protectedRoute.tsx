import { JSX } from 'react';
import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { profileSelectors } from '../../services/slices/profile/profile';
import { Preloader } from '../ui/preloader';

type TProtectedProps = {
  onlyUnAuth?: boolean;
  component: JSX.Element;
};

const Protected = ({
  onlyUnAuth = false,
  component
}: TProtectedProps): JSX.Element => {
  const user = useSelector(profileSelectors.selectUser);
  const isAuthChecked = useSelector(profileSelectors.selectIsAuthChecked);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }

  if (!onlyUnAuth && !user) {
    // для авторизованного, но не авторизован
    return <Navigate to='/login' state={{ from: location }} />;
  }

  if (onlyUnAuth && user) {
    // для неавторизованного, но авторизован
    const { from } = location.state ?? { from: { pathname: '/' } };
    return <Navigate to={from} />;
  }

  // onlyUnAuth && !user для неавторизованного и не авторизован
  // !onlyUnAuth && user для авторизованного и авторизован
  return component;
};

export const OnlyAuth = Protected;

export const OnlyUnAuth = ({ component }: { component: JSX.Element }) => (
  <Protected onlyUnAuth component={component} />
);
