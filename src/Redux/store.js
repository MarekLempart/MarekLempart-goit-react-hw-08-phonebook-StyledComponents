// store.js

import { configureStore } from '@reduxjs/toolkit'; // Importuje funkcję configureStore z Redux Toolkit
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'; // Importuje funkcje i stałe z redux-persist do obsługi trwałego przechowywania stanu
import storage from 'redux-persist/lib/storage'; // Importuje lokalne przechowywanie (localStorage)
import { authReducer } from './Authorization/authSlise'; // Importuje reducer autoryzacji
import { contactsReducer } from './Contacts/contactsSlise'; // Importuje reducer kontaktów
import { filterReducer } from './Contacts/filterSlice'; // Importuje reducer filtra

// Konfiguracja trwałego przechowywania dla autoryzacji
const persistConfig = {
  key: 'auth', // Klucz dla przechowywania stanu autoryzacji
  storage, // Typ przechowywania (localStorage)
  whitelist: ['token'], // Lista białych elementów do przechowywania (w tym przypadku tylko token)
};

// Konfiguruje sklep Redux
export const store = configureStore({
  reducer: {
    auth: persistReducer(persistConfig, authReducer), // Reducer autoryzacji z trwałym przechowywaniem
    filter: filterReducer, // Reducer filtra
    contacts: contactsReducer, // Reducer kontaktów
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER], // Ignorowane akcje dla sprawdzania serializacji
      },
    }),
});

// Tworzy trwały obiekt przechowywania stanu
export const persistor = persistStore(store);
