import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';

import { AuthContextProvider } from './context/AuthContext';
import { SettingsContextProvider } from './context/SettingsContext';
import { SocketContextProvider } from './context/SocketContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SettingsContextProvider>
          <SocketContextProvider>
            <App/>
          </SocketContextProvider>            
        </SettingsContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);