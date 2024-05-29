// ContactForm.jsx

// Importowanie ikony PlusCircleOutlined z biblioteki @ant-design/icons
import { PlusCircleOutlined } from '@ant-design/icons';
// Importowanie hooka useState z React do zarządzania stanem komponentu
import { useState } from 'react';
// Importowanie hooków useDispatch i useSelector z react-redux do pobierania stanu z Redux store i wysyłania akcji
import { useDispatch, useSelector } from 'react-redux';
// Importowanie akcji addContact z pliku operations w folderze Contacts
import { addContact } from '../../Redux/Contacts/operations';
// Importowanie stylizowanych komponentów z pliku ContactForm.styled
import {
  AddModal,
  AddModalBtn,
  FormWrap,
  InputForm,
  OpenAddModal,
  PhoneIcon,
  UserIcon,
} from './ContactForm.styled';

export const ContactForm = () => {
  const [open, setOpen] = useState(false); // Stan dla otwierania modala
  const [form] = FormWrap.useForm(); // Pobieranie funkcji do zarządzania formularzem
  const currentContacts = useSelector(state => state.contacts.items); // Pobieranie listy kontaktów z Redux store
  const loader = useSelector(state => state.contacts.isLoading); // Pobieranie stanu ładowania z Redux store
  const dispatch = useDispatch(); // Hook do wysyłania akcji do Redux store

  // Funkcja do wyświetlania modala
  const showModal = () => {
    form.resetFields(); // Czyszczenie formularza
    setOpen(true); // Otwieranie modala
  };

  // Funkcja do obsługi submit formularza
  const submit = value => {
    // Funkcja do formatowania numeru telefonu
    const formatTel = () => {
      const number = value.number; // Pobieranie numeru telefonu z wartości formularza
      const phoneLength = number.length; // Długość numeru telefonu

      // Sprawdzanie czy numer telefonu jest krótszy niż 7 cyfr
      if (phoneLength < 7) {
        return `(${number.slice(0, 3)}) ${number.slice(3)}`; // Formatowanie numeru w przypadku krótszego niż 7 cyfr
      }

      // Formatowanie numeru w przypadku dłuższego niż 7 cyfr
      return `(${number.slice(0, 3)}) ${number.slice(3, 6)}-${number.slice(
        6,
        10
      )}`;
    };

    const newContact = { name: value.name, number: formatTel() }; // Tworzenie nowego kontaktu
    const newContactName = newContact.name.toLowerCase(); // Zamiana nazwy kontaktu na małe litery

    // Sprawdzanie czy kontakt o takiej nazwie już istnieje
    if (
      currentContacts.find(
        contact => contact.name.toLowerCase() === newContactName
      )
    ) {
      alert(`${newContact.name} is already in contact`); // Wyświetlanie alertu jeśli kontakt już istnieje
    } else {
      dispatch(addContact(newContact)); // Wysyłanie akcji dodania nowego kontaktu do Redux store

      // Jeśli kontakt został dodany, czyszczenie formularza i zamykanie modala
      if (!loader) {
        form.resetFields();
        setOpen(false);
      }
    }
  };

  return (
    <>
      {/* Przycisk do otwierania modala */}
      <OpenAddModal
        type="primary"
        onClick={showModal}
        title="add new contact"
        size={'large'} // Rozmiar przycisku
      >
        <PlusCircleOutlined />
        Add contact
      </OpenAddModal>

      {/* Modal do dodawania nowego kontaktu */}
      <AddModal
        footer={null}
        title="Add new contact"
        open={open}
        onCancel={() => setOpen(false)} // Funkcja do zamykania modala
      >
        <FormWrap
          form={form}
          name="normal_login"
          initialValues={{
            remember: true,
          }}
          onFinish={submit} // Funkcja do obsługi submit formularza
        >
          <FormWrap.Item
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input Name!',
                type: 'text',
              },
            ]}
          >
            <InputForm
              prefix={<UserIcon />} // Ikona użytkownika
              placeholder="Name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$" // Wzór do walidacji nazwy
            />
          </FormWrap.Item>

          <FormWrap.Item
            name="number"
            rules={[
              {
                required: true,
                message: 'Please input Number!',
                type: 'phone',
              },
            ]}
          >
            <InputForm
              prefix={<PhoneIcon />} // Ikona telefonu
              type=""
              placeholder="Number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" // Wzór do walidacji numeru telefonu
            />
          </FormWrap.Item>

          <FormWrap.Item>
            <AddModalBtn type="primary" htmlType="submit">
              Create contact
            </AddModalBtn>
          </FormWrap.Item>
        </FormWrap>
      </AddModal>
    </>
  );
};
