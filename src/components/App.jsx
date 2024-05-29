// App.jsx

// Importowanie komponentu Spiner ze stylów ContactList
import { Spiner } from 'pages/ContactList/ContactList.styled';
// Importowanie funkcji lazy i hooka useEffect z react
import { lazy, useEffect } from 'react';
// Importowanie hooków useDispatch i useSelector z react-redux
import { useDispatch, useSelector } from 'react-redux';
// Importowanie komponentów Navigate, Route i Routes z react-router-dom
import { Navigate, Route, Routes } from 'react-router-dom';
// Importowanie komponentu ToastContainer z react-toastify do obsługi powiadomień
import { ToastContainer } from 'react-toastify';
// Importowanie akcji refreshUser z operacji autoryzacji do odświeżania tokena
import { refreshUser } from '../Redux/Authorization/operations';
// Importowanie globalnych stylów
import { GlobalStyle } from './GlobalStyle';
// Importowanie komponentu Layout
import { Layout } from './Layout/Layout';
// Importowanie komponentu PrivateRoute do ochrony prywatnych tras
import { PrivateRoute } from './PrivateRoute';
// Importowanie komponentu RestrictedRoute do ochrony tras z ograniczeniami
import { RestrictedRoute } from './RestrictedRoute';

// Lazy loading dla stron rejestracji, głównej, logowania i listy kontaktów
const Register = lazy(() => import('../pages/Register/Register'));
const Home = lazy(() => import('../pages/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Contactlist = lazy(() => import('../pages/ContactList/ContactList'));

export const App = () => {
  // Inicjalizacja hooka useDispatch
  const dispatch = useDispatch();

  // Hook useEffect do odświeżania tokena przy załadowaniu komponentu
  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  // Pobieranie stanu isRefreshing ze stanu Redux
  const { isRefreshing } = useSelector(state => state.auth);

  // Jeśli token nie jest odświeżany, renderowanie komponentów
  return !isRefreshing ? (
    <>
      {/* Definiowanie tras */}
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Główna strona */}
          <Route index element={<Home />} />

          {/* Prywatna trasa dla listy kontaktów */}
          <Route
            path="/contacts"
            element={
              <PrivateRoute component={<Contactlist />} redirectTo="/login" />
            }
          />

          {/* Ograniczona trasa dla logowania */}
          <Route
            path="/login"
            element={
              <RestrictedRoute redirectTo="/contacts" component={<Login />} />
            }
          />

          {/* Ograniczona trasa dla rejestracji */}
          <Route
            path="/register"
            element={
              <RestrictedRoute
                redirectTo="/contacts"
                component={<Register />}
              />
            }
          />

          {/* Przekierowanie dla nieznanych tras */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>

      {/* Kontener dla powiadomień */}
      <ToastContainer />

      {/* Globalne style */}
      <GlobalStyle />
    </>
  ) : (
    // Wyświetlanie spinnera podczas odświeżania tokena
    <Spiner />
  );
};
