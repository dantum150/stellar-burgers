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
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    element: <ConstructorPage />
  },
  {
    path: '/feed',
    element: <Feed />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/forgot-password',
    element: <ForgotPassword />
  },
  {
    path: '/reset-password',
    element: <ResetPassword />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/profile/orders',
    element: <ProfileOrders />
  },
  {
    path: '*',
    element: <NotFound404 />
  },
  {
    path: '/ingredients/:id',
    element: (
      <Modal
        title='Детали элементов'
        onClose={() => console.log('закрыта модалка')}
      >
        <IngredientDetails />
      </Modal>
    )
  }
]);

// {path: '/', element: }

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <RouterProvider router={router} />
  </div>
);

export default App;
