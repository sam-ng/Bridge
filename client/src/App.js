import ReactDom from 'react-dom/client';
import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import socketClient from 'socket.io-client';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // const socket = socketClient(
  //   `${process.env.REACT_APP_SERVER_SCHEME}${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`
  // );

  // socket.on('connection', () => {
  //   console.log('client side connected');
  // });

  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/protect' element={<>Another protected route</>} />
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
    </Routes>
  );
}

export default App;
