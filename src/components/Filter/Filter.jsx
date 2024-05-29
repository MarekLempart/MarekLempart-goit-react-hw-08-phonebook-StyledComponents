// Filter.jsx

// Importowanie ikony SearchOutlined z biblioteki @ant-design/icons
import { SearchOutlined } from '@ant-design/icons';
// Importowanie hooków useDispatch i useSelector z react-redux do pobierania stanu z Redux store i wysyłania akcji
import { useDispatch, useSelector } from 'react-redux';
// Importowanie akcji filtracji z pliku filterSlice w folderze Contacts
import { filtration } from '../../Redux/Contacts/filterSlice';
// Importowanie stylizowanych komponentów z pliku Filter.styled
import { FilterInput, FilterP, WrapperFiler } from './Filter.styled';

export const Filter = () => {
  const dispatch = useDispatch(); // Hook do wysyłania akcji do Redux store
  const filter = useSelector(state => state.filter); // Pobieranie stanu filtra z Redux store

  return (
    <WrapperFiler>
      <FilterP>Find contacts by name</FilterP> {/* Nagłówek filtra */}
      <FilterInput
        prefix={<SearchOutlined />} // Ikona wyszukiwania
        type="text" // Typ pola input
        value={filter} // Wartość pola input z Redux store
        onChange={e => dispatch(filtration(e.target.value))} // Filtrowanie kontaktów przy zmianie wartości pola input
      />
    </WrapperFiler>
  );
};
