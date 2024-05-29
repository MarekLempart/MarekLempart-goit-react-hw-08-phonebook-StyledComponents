// PrivateRoute.jsx

// Importowanie hooka useSelector z react-redux
import { useSelector } from 'react-redux';
// Importowanie komponentu Navigate z react-router-dom
import { Navigate } from 'react-router-dom';

// Definicja komponentu PrivateRoute
export const PrivateRoute = ({ component: Component, redirectTo: addres }) => {
  // Pobieranie stanu isLoaggedIn i isRefreshing ze stanu Redux
  const { isLoaggedIn, isRefreshing } = useSelector(state => state.auth);

  // Logika sprawdzająca, czy użytkownik powinien być przekierowany
  // Jeśli użytkownik nie jest zalogowany i nie trwa odświeżanie tokena, to ustawiamy shouldRedirect na true
  const shouldRedirect = !isLoaggedIn && !isRefreshing;

  // Jeśli użytkownik powinien być przekierowany, to renderujemy komponent Navigate przekierowujący do adresu podanego w redirectTo
  // Jeśli użytkownik jest zalogowany, renderujemy przekazany komponent
  return shouldRedirect ? <Navigate to={addres} /> : Component;
};
