// RestrictedRoute.jsx

// Importowanie hooka useSelector z react-redux
import { useSelector } from 'react-redux';
// Importowanie komponentu Navigate z react-router-dom
import { Navigate } from 'react-router-dom';

// Definicja komponentu RestrictedRoute
export const RestrictedRoute = ({ component: Component, redirectTo = '/' }) => {
  // Pobieranie stanu isLoaggedIn ze stanu Redux
  const { isLoaggedIn } = useSelector(state => state.auth);

  // Jeśli użytkownik jest zalogowany, przekierowujemy go na adres podany w redirectTo (domyślnie na '/')
  // Jeśli użytkownik nie jest zalogowany, renderujemy przekazany komponent
  return isLoaggedIn ? <Navigate to={redirectTo} /> : Component;
};
