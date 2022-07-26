import ReactDom from 'react-dom/client';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import socketClient from 'socket.io-client';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  const [token, setToken] = useState(true);

  // const socket = socketClient(
  //   `${process.env.REACT_APP_SERVER_SCHEME}${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`
  // );

  // socket.on('connection', () => {
  //   console.log('client side connected');
  // });

  return !token ? (
    <Login setToken={setToken} />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
