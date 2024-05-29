// contactsSlise.js

import { createSlice } from '@reduxjs/toolkit';
import {
  addContact,
  deleteContact,
  fetchContacts,
  redactContatc,
} from './operations'; // Importuje operacje związane z kontaktami

import { toast } from 'react-toastify'; // Importuje funkcję do wyświetlania powiadomień
import 'react-toastify/dist/ReactToastify.css'; // Importuje style CSS dla powiadomień
import { logOut } from '../Authorization/operations'; // Importuje operację wylogowania

// Funkcja pomocnicza ustawiająca stan na "ładowanie"
const handlePending = state => {
  state.isLoading = true;
  state.error = null;
};

// Funkcja pomocnicza obsługująca odrzucone akcje
const handleRejected = (state, action) => {
  state.isLoading = false;
  state.error = action.payload;

  // Wyświetla komunikat o błędzie za pomocą toast
  toast.error(
    `${action.payload}` === 'Network Error'
      ? `${action.payload}`
      : 'Coś poszło nie tak. Sprawdź swoje dane i spróbuj ponownie'
  );
};

// Tworzy slice stanu dla kontaktów
const contactSlice = createSlice({
  name: 'contacts', // Nazwa slice'a
  initialState: {
    items: [], // Tablica przechowująca kontakty
    isLoading: false, // Flaga informująca o ładowaniu danych
    error: null, // Błąd w przypadku problemów z pobieraniem danych
  },

  extraReducers: builder => {
    builder
      // Obsługa pobierania kontaktów
      .addCase(fetchContacts.pending, handlePending)
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)

      // Obsługa usuwania kontaktów
      .addCase(deleteContact.pending, handlePending)
      .addCase(deleteContact.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(deleteContact.rejected, handleRejected)

      // Obsługa dodawania kontaktów
      .addCase(addContact.pending, handlePending)
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.unshift(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(addContact.rejected, handleRejected)

      // Obsługa edycji kontaktów
      .addCase(redactContatc.pending, handlePending)
      .addCase(redactContatc.fulfilled, (state, action) => {
        const index = state.items.findIndex(
          task => task.id === action.payload.id
        );
        state.items.splice(index, 1);
        state.items.unshift(action.payload);
        state.isLoading = false;
        state.error = null;
      })
      .addCase(redactContatc.rejected, handleRejected)

      // Obsługa wylogowania
      .addCase(logOut.fulfilled, state => {
        state.items = [];
        state.error = null;
        state.isLoading = false;
      });
  },
});

// Eksportuje reducer dla kontaktów
export const contactsReducer = contactSlice.reducer;
