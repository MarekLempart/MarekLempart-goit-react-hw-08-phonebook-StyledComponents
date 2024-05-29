// operation.js

import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Ustawienie domyślnego adresu URL dla wszystkich żądań HTTP
axios.defaults.baseURL = 'https://connections-api.herokuapp.com/';

// Funkcja ustawiająca nagłówek autoryzacyjny na podstawie otrzymanego tokenu
const setAuthHeader = token =>
  (axios.defaults.headers.common.Authorization = `Bearer ${token}`);

// Funkcja usuwająca nagłówek autoryzacyjny
const cleanAuthHeader = () =>
  (axios.defaults.headers.common.Authorization = '');

// Asynchroniczna akcja rejestracji użytkownika
export const register = createAsyncThunk(
  'auth/register',
  async (user, { rejectWithValue }) => {
    try {
      // Wysłanie żądania POST z danymi użytkownika do endpointa '/users/signup'
      const response = await axios.post('/users/signup', user);
      // Ustawienie nagłówka autoryzacyjnego na podstawie otrzymanego tokenu
      setAuthHeader(response.data.token);
      // Zwrócenie danych użytkownika z odpowiedzi
      return response.data;
    } catch (e) {
      // Obsługa błędu i zwrócenie komunikatu błędu
      return rejectWithValue(e.message);
    }
  }
);

// Asynchroniczna akcja logowania użytkownika
export const loginization = createAsyncThunk(
  'auth/loginization',
  async (user, { rejectWithValue }) => {
    try {
      // Wysłanie żądania POST z danymi użytkownika do endpointa '/users/login'
      const response = await axios.post('/users/login', user);
      // Ustawienie nagłówka autoryzacyjnego na podstawie otrzymanego tokenu
      setAuthHeader(response.data.token);
      // Zwrócenie danych użytkownika z odpowiedzi
      return response.data;
    } catch (e) {
      // Obsługa błędu i zwrócenie komunikatu błędu
      return rejectWithValue(e.message);
    }
  }
);

// Asynchroniczna akcja wylogowania użytkownika
export const logOut = createAsyncThunk(
  'auth/logout',
  async (user, { rejectWithValue }) => {
    try {
      // Wysłanie żądania POST do endpointa '/users/logout'
      await axios.post('/users/logout', user);
      // Usunięcie nagłówka autoryzacyjnego
      cleanAuthHeader();
    } catch (e) {
      // Obsługa błędu i zwrócenie komunikatu błędu
      return rejectWithValue(e.message);
    }
  }
);

// Asynchroniczna akcja odświeżania danych użytkownika
export const refreshUser = createAsyncThunk(
  'auth/refreshUser',
  async (_, { getState, rejectWithValue }) => {
    const { token } = getState().auth;
    // Jeśli istnieje token, ustawia nagłówek autoryzacyjny
    token && setAuthHeader(token);

    try {
      // Wysłanie żądania GET do endpointa '/users/current'
      const response = await axios.get('/users/current');
      // Zwrócenie danych użytkownika z odpowiedzi
      return response.data;
    } catch (e) {
      // Obsługa błędu i zwrócenie komunikatu błędu
      return rejectWithValue(e.message);
    }
  }
);
