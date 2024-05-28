import { Spiner } from 'pages/ContactList/ContactList.styled';
import { lazy, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // для вспливаючих повідомлень
import { refreshUser } from '../Redux/Authorization/operations'; // для обновления токена
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import { PrivateRoute } from './PrivateRoute'; // для захисту роутів
import { RestrictedRoute } from './RestrictedRoute'; // для захисту роутів

const Register = lazy(() => import('../pages/Register/Register'));
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Contactlist = lazy(() => import('../pages/ContactList/ContactList'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshUser()); // для обновления токена
  }, [dispatch]);

  const { isRefreshing } = useSelector(state => state.auth);

  // якщо не обновляється токен, то рендеримо компоненти
  return !isRefreshing ? (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />

          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<Contactlist />} redirectTo="/login" />
            }
          />
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>

      {/* для вспливаючих повідомлень */}
      <ToastContainer />

      {/* для глобальних стилів */}
      <GlobalStyle />
    </>
  ) : (
    <Spiner />
  );
};
