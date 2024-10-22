import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { updateUser } from '../../services/slices/users-slice';
export const Profile: FC = () => {
  /** TODO: взять переменную из стора */

  // 1. ипортировать useSelector((state) => state.users) и положить в переменную
  // 2. Получить доступ до слайса
  // 3. Получить объекта user из нашего слайса
  const usersSlice = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const user = usersSlice.user;

  // backend => fetch => dispatch(thunk) => слайс | стор

  // 1. Пользователь либо кликает по кнопке "Сохранить" | жмёт на enter (submit) => dispatch(Санки | экшн-фукнции) || updateUser
  // 2. Нам создать санку () => updateUserApi() // {user:  'musorkaDantum@mail', name: 'Даниил Рамм'}
  // 3. В сторе у нас есть user: {email: 'musorkaDantum@mail', name: 'Даниил Казаков'}
  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prevState) => ({
      ...prevState,
      name: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== user?.name ||
    formValue.email !== user?.email ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    // Всё, что передаем, должно вызываться
    dispatch(updateUser(formValue));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormValue((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );

  return null;
};
