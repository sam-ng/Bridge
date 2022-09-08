import { Routes, Route } from 'react-router-dom';

import './App.css';

import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PersistLogin from './components/PersistLogin';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      {/* Protected Routes */}
      <Route element={<PersistLogin />}>
        <Route element={<ProtectedRoute />}>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/protect' element={<>Another protected route</>} />
        </Route>
      </Route>
      <Route path='/login' element={<Login />} />
      <Route path='/signup' element={<Signup />} />
      <Route path='*' element={<div>404 NOT FOUND</div>} />
    </Routes>
  );
}

export default App;
