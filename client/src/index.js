import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

import { BrowserRouter } from 'react-router-dom';

import { AuthProvider } from './context/AuthProvider';
import { SocketProvider } from './context/SocketProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <BrowserRouter>
    <AuthProvider>
      <SocketProvider>
        <App />
      </SocketProvider>
    </AuthProvider>
  </BrowserRouter>
  // </React.StrictMode>
);
