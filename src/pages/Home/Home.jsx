// Home.jsx

// Importowanie stylów
import { useSelector } from 'react-redux'; // Importowanie hooka useSelector z Redux
import {
  HomeContactList,
  HomeEdit,
  HomeLink,
  HomePhoneIcon,
  HomeUserGroup,
  Section,
  Title,
  UnderTitle,
  Wrap,
} from './Home.styled';

export default function Home() {
  const { isLoaggedIn } = useSelector(state => state.auth); // Sprawdzenie, czy użytkownik jest zalogowany

  return (
    <Section>
      <Title>Wellcome to you PhoneBook</Title> {/* Tytuł witryny */}
      <Wrap>
        {/* Kontener dla ikon i elementów interfejsu */}
        <HomeEdit /> <HomePhoneIcon />
        <HomeUserGroup />
        <HomeContactList />
      </Wrap>
      {/* Wyświetlanie odpowiedniej informacji w zależności od stanu zalogowania */}
      {!isLoaggedIn ? ( // Jeśli użytkownik nie jest zalogowany
        <UnderTitle>
          Please {/* Informacja zachęcająca do rejestracji */}
          <HomeLink to="/register">Register</HomeLink>
          or {/* Separator */}
          <HomeLink to="/login">Log in</HomeLink>
          to be able to use your PhoneBook{' '}
          {/* Informacja o konieczności zalogowania się */}
        </UnderTitle>
      ) : (
        // Jeśli użytkownik jest zalogowany
        <UnderTitle>
          Go to the tab {/* Informacja o przejściu do zakładki kontaktów */}
          <HomeLink to="/contacts">Contacts</HomeLink>
          and manage your contacts {/* Informacja o zarządzaniu kontaktami */}
        </UnderTitle>
      )}
    </Section>
  );
}
