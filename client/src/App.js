import ReactDom from 'react-dom/client';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import socketClient from 'socket.io-client';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import RequireAuth from './components/RequireAuth';

function App() {
  // const socket = socketClient(
  //   `${process.env.REACT_APP_SERVER_SCHEME}${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`
  // );

  // socket.on('connection', () => {
  //   console.log('client side connected');
  // });

  return (
    <Routes>
      <Route element={<RequireAuth />}>
        <Route path='/' element={<Home />} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
