import { ConstructorPage } from '@pages';
import '../../index.css';
import styles from './app.module.css';
import {
  Register,
  Feed,
  Login,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { AppHeader, Modal, IngredientDetails } from '@components';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { getUserInfo } from '../../services/slices/users-slice';
import { OrderInfo } from '@components';

// 1. Protected Route - обычный реактовский компонет (функция)
// 2. Его задача - смотреть, авторизованы мы или нет, если да - пускать нас на нужную страницу, если не авторизованы - на страницу логина

interface IProps {
  children: React.ReactNode;
}

function ProtectedRoute(props: IProps) {
  // 1. Получить доступ до юзерслайса (useSelector)
  // 2. if (isAuthChecked) else
  const userStor = useSelector((state) => state.users);

  if (userStor.isAuthChecked === true) {
    return props.children;
  } else {
    return <Navigate to='/login' />;
  }
}

<ProtectedRoute>
  <Profile />
</ProtectedRoute>;

const router = createBrowserRouter([
  {
    path: '*',
    element: <NotFound404 />
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal title='Детали элементов' onClose={() => console.log()}>
        <IngredientDetails />
      </Modal>
    )
  }
]);

// {path: '/', element: }

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function closeModal() {
    navigate(-1);
  }

  //getUserInfo
  useEffect(() => {
    dispatch(getUserInfo());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      {/* <RouterProvider router={router} /> */}
      <Routes>
        <Route path='/' element={<ConstructorPage />} />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали элементов' onClose={closeModal}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route
          path='/feed'
          element={
            <ProtectedRoute>
              <Feed />
            </ProtectedRoute>
          }
        />

        <Route
          path='/profile/orders/:number' // feed/:number
          element={
            <Modal title='Детали заказа' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />

        <Route
          path='/feed/:number' // feed/:number
          element={
            <Modal title='Детали заказа' onClose={closeModal}>
              <OrderInfo />
            </Modal>
          }
        />
      </Routes>
    </div>
  );
};
// 1. useDispatch с помощью которого запускаем санку
// 2. Сделаем санку в слайсе
// 3. pending/fulfiled/rejected

export default App;
