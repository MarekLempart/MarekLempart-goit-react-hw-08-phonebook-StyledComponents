// UseMenu.jsx

// Importowanie ikony wylogowania z ant-design icons
import { LogoutOutlined } from '@ant-design/icons';
// Importowanie komponentów Avatar i Button z ant-design
import { Avatar, Button } from 'antd';
// Importowanie hooków useDispatch i useSelector z react-redux
import { useDispatch, useSelector } from 'react-redux';
// Importowanie akcji logOut z operacji autoryzacji
import { logOut } from '../../Redux/Authorization/operations';
// Importowanie stylów z UserMenu.styled
import { Wrap } from './Usermenu.styled';

export const UserMenu = () => {
  // Wyciągamy email użytkownika ze stanu Redux
  const { email } = useSelector(state => state.auth.user);

  // Używamy dispatch do wysyłania akcji Redux
  const dispatch = useDispatch();

  return (
    <Wrap>
      {/* Wyświetlamy awatar z pierwszą literą email */}
      <Avatar>{email.slice(0, 1).toUpperCase()}</Avatar>
      {/* Wyświetlamy email użytkownika */}
      <p>{email}</p>
      {/* Przycisk wylogowania z ikoną */}
      <Button type="primary" onClick={() => dispatch(logOut())}>
        <LogoutOutlined /> Log out
      </Button>
      {/* Pusty element {' '} dla odstępu */}
    </Wrap>
  );
};
