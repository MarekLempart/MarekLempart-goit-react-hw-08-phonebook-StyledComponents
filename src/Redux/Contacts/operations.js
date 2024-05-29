// operation.js

import { createAsyncThunk } from '@reduxjs/toolkit'; // Importuje funkcję createAsyncThunk z Redux Toolkit
import axios from 'axios'; // Importuje axios do wykonywania żądań HTTP

axios.defaults.baseURL = 'https://connections-api.herokuapp.com/'; // Ustawia bazowy URL dla żądań HTTP

// Tworzy asynchroniczne funkcje do wykonywania operacji na kontaktach

// Pobiera listę kontaktów
export const fetchContacts = createAsyncThunk(
  'contacts/fetchContacts', // Typ akcji
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/contacts'); // Wysyła żądanie GET do endpointu /contacts
      return response.data; // Zwraca dane odpowiedzi
    } catch (e) {
      return rejectWithValue(e.message); // Zwraca błąd z wartością odrzuconą
    }
  }
);

// Usuwa kontakt
export const deleteContact = createAsyncThunk(
  'contacts/deleteContact', // Typ akcji
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`/contacts/${id}`); // Wysyła żądanie DELETE do endpointu /contacts/:id
      return response.data; // Zwraca dane odpowiedzi
    } catch (e) {
      return rejectWithValue(e.message); // Zwraca błąd z wartością odrzuconą
    }
  }
);

// Dodaje nowy kontakt
export const addContact = createAsyncThunk(
  'contacts/addContact', // Typ akcji
  async (subscriber, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/contacts`, subscriber); // Wysyła żądanie POST do endpointu /contacts z danymi nowego kontaktu
      return response.data; // Zwraca dane odpowiedzi
    } catch (e) {
      return rejectWithValue(e.message); // Zwraca błąd z wartością odrzuconą
    }
  }
);

// Aktualizuje istniejący kontakt
export const redactContatc = createAsyncThunk(
  'contacts/redactContatc', // Typ akcji
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.patch(`/contacts/${data.id}`, {
        // Wysyła żądanie PATCH do endpointu /contacts/:id z danymi do aktualizacji
        name: data.name, // Nowa nazwa kontaktu
        number: data.number, // Nowy numer kontaktu
      });
      return response.data; // Zwraca dane odpowiedzi
    } catch (e) {
      return rejectWithValue(e.message); // Zwraca błąd z wartością odrzuconą
    }
  }
);
