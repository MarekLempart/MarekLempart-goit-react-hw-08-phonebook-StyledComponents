// authSlice.js

import { createSlice } from '@reduxjs/toolkit'; // Import narzędzia createSlice z Redux Toolkit
import { toast } from 'react-toastify'; // Import modułu toast do wyświetlania powiadomień użytkownikowi
import 'react-toastify/dist/ReactToastify.css'; // Import styli dla modułu toast
import { logOut, loginization, refreshUser, register } from './operations'; // Import operacji związanych z uwierzytelnianiem

// Funkcja obsługująca stan w przypadku oczekiwania na zakończenie operacji
const handlePending = state => {
  state.isLoading = true; // Ustawienie isLoading na true
  state.error = null; // Wyzerowanie error
};

// Funkcja obsługująca stan w przypadku odrzucenia operacji z błędem
const handleRejected = (state, action) => {
  state.isLoading = false; // Ustawienie isLoading na false
  state.error = action.payload; // Ustawienie error na otrzymany komunikat błędu

  // Wyświetlenie powiadomienia typu error
  toast.error(
    `${action.payload}` === 'Network Error'
      ? `${action.payload}`
      : 'Something went wrong. Check your data and try again'
  );
};

// Definicja slice'a authSlice
const authSlice = createSlice({
  name: 'auth', // Nazwa slice'a
  initialState: {
    user: { email: null, password: null }, // Obiekt zawierający dane użytkownika
    token: null, // Token użytkownika
    isLoaggedIn: false, // Flaga oznaczająca, czy użytkownik jest zalogowany
    isRefreshing: false, // Flaga oznaczająca, czy trwa odświeżanie danych użytkownika
    error: null, // Błąd
    isLoading: false, // Flaga oznaczająca, czy trwa ładowanie
  },
  extraReducers: builder => {
    builder
      // Obsługa akcji związanej z rejestracją użytkownika
      .addCase(register.pending, handlePending) // Obsługa oczekiwania na zakończenie operacji rejestracji
      .addCase(register.fulfilled, (state, action) => {
        // Obsługa pomyślnego zakończenia operacji rejestracji
        state.token = action.payload.token; // Ustawienie tokenu
        state.user = action.payload.user; // Ustawienie danych użytkownika
        state.isLoaggedIn = true; // Oznaczenie użytkownika jako zalogowanego
        state.isLoading = false; // Zakończenie ładowania
      })
      .addCase(register.rejected, handleRejected) // Obsługa odrzucenia operacji rejestracji z błędem

      // Obsługa akcji związanej z logowaniem użytkownika
      .addCase(loginization.pending, handlePending) // Obsługa oczekiwania na zakończenie operacji logowania
      .addCase(loginization.fulfilled, (state, action) => {
        // Obsługa pomyślnego zakończenia operacji logowania
        state.token = action.payload.token; // Ustawienie tokenu
        state.user = action.payload.user; // Ustawienie danych użytkownika
        state.isLoaggedIn = true; // Oznaczenie użytkownika jako zalogowanego
        state.isLoading = false; // Zakończenie ładowania
      })
      .addCase(loginization.rejected, handleRejected) // Obsługa odrzucenia operacji logowania z błędem

      // Obsługa akcji wylogowania użytkownika
      .addCase(logOut.pending, handlePending) // Obsługa oczekiwania na zakończenie operacji wylogowania
      .addCase(logOut.fulfilled, state => {
        // Obsługa pomyślnego zakończenia operacji wylogowania
        state.user = { email: null, password: null }; // Zresetowanie danych użytkownika
        state.token = null; // Usunięcie tokenu
        state.isLoaggedIn = false; // Oznaczenie użytkownika jako wylogowanego
        state.isRefreshing = false; // Zakończenie odświeżania
        state.error = null; // Wyzerowanie błędu
        state.isLoading = false; // Zakończenie ładowania
      })
      .addCase(logOut.rejected, handleRejected) // Obsługa odrzucenia operacji wylogowania z błędem

      // Obsługa akcji odświeżenia danych użytkownika
      .addCase(refreshUser.pending, state => {
        // Obsługa oczekiwania na zakończenie operacji odświeżenia danych użytkownika
        state.isRefreshing = true; // Ustawienie flagi odświeżania
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        // Obsługa pomyślnego zakończenia operacji odświeżenia danych użytkownika
        state.user = action.payload; // Ustawienie danych użytkownika
        state.isLoaggedIn = true; // Oznaczenie użytkownika jako zalogowanego
        state.isRefreshing = false; // Zakończenie odświeżania
      })
      .addCase(refreshUser.rejected, (state, action) => {
        // Obsługa odrzucenia operacji odświeżenia danych użytkownika z błędem
        state.isRefreshing = false; // Zakończenie odświeżania
      });
  },
});

export const authReducer = authSlice.reducer; // Eksport reducer'a z slice'a
