import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { profileSelectors, signIn } from '../../services/slices/profile/profile';

export const Login: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const errorMessage = useSelector(profileSelectors.selectError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      signIn({
        email: email,
        password: password
      })
    );
  };

  return (
    <LoginUI
      errorText={errorMessage as string}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
