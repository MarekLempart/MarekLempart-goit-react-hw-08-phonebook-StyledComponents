// AppBar.jsx

// Importowanie ikon i stylizowanych komponentów z pliku AppBar.styled
import {
  ContactIcon,
  Container,
  HomeIcon,
  Link,
  LogInIcon,
  Nav,
  RegIcon,
} from './AppBar.styled';
// Importowanie komponentu UserMenu
import { UserMenu } from 'components/UserMenu/UserMenu';
// Importowanie komponentu Spiner z pliku ContactList.styled
import { Spiner } from 'pages/ContactList/ContactList.styled';
// Importowanie hooka useSelector z react-redux do pobierania stanu z Redux store
import { useSelector } from 'react-redux';

// Definicja komponentu AppBar
export const AppBar = () => {
  // Pobieranie stanu isLoaggedIn i isLoading z reducer'a auth z Redux store
  const { isLoaggedIn, isLoading } = useSelector(state => state.auth); // sprawdzanie, czy użytkownik jest zalogowany i czy trwa ładowanie tokenu

  return (
    // Zwracanie elementu header
    <header>
      {/* Wyświetlanie spinnera, jeśli trwa ładowanie */}
      {isLoading && <Spiner />}

      {/* Kontener nawigacyjny */}
      <Container>
        <Nav>
          <div>
            {/* Link do strony głównej */}
            <Link to="/">
              <HomeIcon />
              Home
            </Link>
            {/* Link do strony kontaktów, widoczny tylko gdy użytkownik jest zalogowany */}
            {isLoaggedIn && (
              <Link to="/contacts">
                <ContactIcon />
                Contacts
              </Link>
            )}
          </div>
          <div>
            {/* Jeśli użytkownik jest zalogowany, wyświetla UserMenu, w przeciwnym razie linki do rejestracji i logowania */}
            {isLoaggedIn ? (
              <UserMenu />
            ) : (
              <>
                <Link to="/register">
                  <RegIcon />
                  Register
                </Link>
                <Link to="/login">
                  <LogInIcon />
                  Log in
                </Link>
              </>
            )}
          </div>
        </Nav>
      </Container>
    </header>
  );
};
