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
  Route
} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

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
      <Modal title='Детали элементов' onClose={() => console.log()}>
        <IngredientDetails />
      </Modal>
    )
  }
]);

// {path: '/', element: }

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    {/* <RouterProvider router={router} /> */}
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<ConstructorPage />} />

        <Route
          path='/ingredients/:id'
          element={
            <Modal title='Детали элементов' onClose={() => console.log(123)}>
              <IngredientDetails />
            </Modal>
          }
        />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  </div>
);

export default App;
