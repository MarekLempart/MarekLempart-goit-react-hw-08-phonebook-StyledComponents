// index.js

// Importowanie głównego komponentu aplikacji
import { App } from 'components/App';
// Importowanie biblioteki React
import React from 'react';
// Importowanie biblioteki ReactDOM do renderowania komponentów React
import ReactDOM from 'react-dom/client';
// Importowanie Providera z biblioteki react-redux, który dostarcza store Redux do aplikacji
import { Provider } from 'react-redux';
// Importowanie komponentu BrowserRouter z biblioteki react-router-dom do zarządzania routingiem
import { BrowserRouter } from 'react-router-dom';
// Importowanie PersistGate z biblioteki redux-persist do obsługi trwałego przechowywania stanu Redux
import { PersistGate } from 'redux-persist/integration/react';
// Importowanie store i persistor z pliku Redux/store
import { persistor, store } from './Redux/store';
// Importowanie pliku CSS z globalnymi stylami
import './index.css';

// Renderowanie głównego komponentu aplikacji w elemencie HTML o id 'root'
ReactDOM.createRoot(document.getElementById('root')).render(
  // React.StrictMode pomaga w wykrywaniu potencjalnych problemów w aplikacji
  <React.StrictMode>
    {/* Provider dostarcza store Redux do całej aplikacji */}
    <Provider store={store}>
      {/* BrowserRouter umożliwia nawigację po aplikacji za pomocą ścieżek URL */}
      <BrowserRouter basename="/goit-react-hw-08-phonebook-StyledComponents">
        {/* PersistGate opóźnia renderowanie aplikacji do momentu przywrócenia stanu Redux */}
        <PersistGate loading={null} persistor={persistor}>
          {/* Główny komponent aplikacji */}
          <App />
        </PersistGate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
