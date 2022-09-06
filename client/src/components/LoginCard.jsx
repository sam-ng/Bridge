import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import useAuth from '../hooks/useAuth';

const LoginCard = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();

    setAuth({});
    alert('You have submitted the form.');
  };

  return (
    <div className='w-full max-w-xs'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        onSubmit={handleSubmit}
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='username'
          >
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:shadow-outline'
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full px-3 py-2 mb-3 text-gray-700 leading-tight focus:shadow-outline'
            id='password'
            type='password'
            name='password'
            placeholder='Super Secret Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded focus:shadow-outline'
            type='submit'
          >
            Sign In
          </button>
          <a
            className='font-bold text-sm text-blue-500 hover:text-blue-800'
            href='/signup'
          >
            Register
          </a>
          <a
            className='font-bold text-sm text-blue-500 hover:text-blue-800'
            href='#'
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default LoginCard;
