import { Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedRoute from './components/ProtectedRoute';
import Chat from './components/Chat';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      {/* Protected Routes */}
      {/* <Route element={<ProtectedRoute />}>
        <Route path='/' element={<Home />} />
        <Route path='/protect' element={<>Another protected route</>} />
      </Route> */}
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='/chat' element={<Chat />} />
    </Routes>
  );
}

export default App;
