// ContactList.jsx

// Importowanie stylów
import { DeleteOutlined, EditOutlined } from '@ant-design/icons'; // Importowanie ikon
import { Button, Popconfirm } from 'antd'; // Importowanie komponentów z Ant Design
import { ContactForm } from 'components/ContactForm/ContactForm'; // Importowanie formularza kontaktowego
import { Filter } from 'components/Filter/Filter'; // Importowanie filtra kontaktów
import { useEffect, useState } from 'react'; // Importowanie hooków React
import { useDispatch, useSelector } from 'react-redux'; // Importowanie hooków Redux
import {
  deleteContact,
  fetchContacts,
  redactContatc,
} from '../../Redux/Contacts/operations'; // Importowanie operacji
import {
  ButtonRedact,
  Container,
  DivName,
  InputForm,
  Item,
  List,
  ModalRedact,
  PhoneIcon,
  PhoneiconList,
  Spiner,
  Title,
  UserIcon,
  UserIconList,
} from './ContactList.styled';

export default function Contactlist() {
  const [subName, setSubName] = useState(''); // Stan dla nazwy kontaktu do edycji
  const [subNumber, setSubNumber] = useState(''); // Stan dla numeru kontaktu do edycji
  const [subId, setSubId] = useState(null); // Stan dla ID kontaktu do edycji
  const [isModalOpen, setIsModalOpen] = useState(false); // Stan dla otwarcia modala
  const dispatch = useDispatch();

  // Funkcja obsługi zatwierdzenia edycji kontaktu
  const handleOk = () => {
    setIsModalOpen(false); // Zamknięcie modala
    dispatch(redactContatc({ id: subId, name: subName, number: subNumber })); // Wywołanie operacji edycji kontaktu
  };

  // Funkcja otwarcia modala z danymi kontaktu do edycji
  const showModal = (name, number, id) => {
    setSubNumber(number);
    setSubName(name);
    setSubId(id);
    setIsModalOpen(true);
  };

  // Funkcja zamknięcia modala
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // Pobranie kontaktów przy pierwszym renderze komponentu
  useEffect(() => {
    dispatch(fetchContacts()); // Pobranie kontaktów z backendu
  }, [dispatch]);

  const { isLoading } = useSelector(state => state.contacts); // Pobranie stanu ładowania kontaktów
  const contacts = useSelector(state => state.contacts.items); // Pobranie kontaktów z Redux
  const filterData = useSelector(state => state.filter).toLowerCase(); // Pobranie wartości filtra

  // Filtracja kontaktów na podstawie wartości filtra
  const visibleContacts = contacts.filter(subscriber =>
    subscriber.name.toLowerCase().includes(filterData)
  );

  return (
    <section>
      <Container>
        <div>
          {/* Jeśli nie ma kontaktów, wyświetlamy zachętę do dodania pierwszego kontaktu, w przeciwnym razie wyświetlamy filtr */}
          {contacts.length < 1 ? (
            <Title>Add your first contact</Title>
          ) : (
            <Filter />
          )}
          <ContactForm /> {/* Formularz do dodawania nowych kontaktów */}
          {isLoading && <Spiner />} {/* Spinner podczas ładowania */}
        </div>
        <List>
          {/* Wyświetlanie listy kontaktów z opcjami edycji i usuwania */}
          {visibleContacts.map(({ id, name, number }) => (
            <Item key={id}>
              {/* Wyświetlanie nazwy kontaktu z ikoną */}
              <DivName>
                <UserIconList />
                {name}:
              </DivName>
              <PhoneiconList /> {number}
              {/* Przycisk do edycji kontaktu */}
              <ButtonRedact
                onClick={() => showModal(name, number, id)}
                title="Edit contatc"
              >
                <EditOutlined />
                Edit
              </ButtonRedact>
              {/* Potwierdzenie usunięcia kontaktu */}
              <Popconfirm
                title="Are you sure delete this task?"
                okText="Yes"
                cancelText="No"
                onConfirm={() => dispatch(deleteContact(id))}
              >
                <Button title="delete contact" type="primary">
                  <DeleteOutlined /> Delete
                </Button>
              </Popconfirm>
            </Item>
          ))}

          {/* Modal do edycji kontaktu */}
          <ModalRedact
            title="Edit a contact"
            open={isModalOpen}
            onOk={handleOk}
            onCancel={handleCancel}
          >
            <InputForm
              prefix={<UserIcon />}
              value={subName} // Pole edycji nazwy kontaktu
              onChange={e => {
                setSubName(e.target.value);
              }}
            />
            <InputForm
              prefix={<PhoneIcon />}
              value={subNumber} // Pole edycji numeru kontaktu
              onChange={e => {
                setSubNumber(e.target.value);
              }}
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            />
          </ModalRedact>
        </List>
      </Container>
    </section>
  );
}
