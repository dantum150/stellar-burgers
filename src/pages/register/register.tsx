import { FC, SyntheticEvent, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch } from '../../services/store';
import { register } from 'module';
import { registerUser } from '../../services/slices/users-slice';
import { useNavigate } from 'react-router-dom';

export const Register: FC = () => {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // 1. Вписываем данные в форму
  // 2. Засабмить форму (клик по кнопке "зарегатьтся" | enter)
  // 3. диспатч(санка | экшн-функция)
  // registerUser
  const dispatch = useDispatch();
  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();

    await dispatch(registerUser({ email, name: userName, password }));
    console.log('диспатч отработал');
    navigate('/login');
    console.log('пришли на страницу логина');
    console.log({ userName, email, password });
  };

  return (
    <RegisterUI
      errorText=''
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
