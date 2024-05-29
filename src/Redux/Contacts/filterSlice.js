// filterSlice.js

import { createSlice } from '@reduxjs/toolkit'; // Importuje funkcję createSlice z Redux Toolkit
import { logOut } from '../Authorization/operations'; // Importuje operację wylogowania

// Tworzy slice stanu dla filtra
export const filterSlice = createSlice({
  name: 'filter', // Nazwa slice'a
  initialState: '', // Początkowy stan filtra
  reducers: {
    // Definiuje reducer dla filtrowania
    filtration: (state, action) => {
      // Akcja filtrowania ustawia stan na wartość przekazaną w payloadzie
      return (state = action.payload);
    },
  },
  extraReducers: builder => {
    // Obsługa wylogowania użytkownika
    builder.addCase(logOut.fulfilled, state => {
      // Po wylogowaniu resetuje stan filtra na pusty string
      return (state = '');
    });
  },
});

// Eksportuje akcję filtrowania
export const { filtration } = filterSlice.actions;

// Eksportuje reducer dla filtra
export const filterReducer = filterSlice.reducer;
