import { useState } from 'react';
import { signupUser } from '../services/login';

const SignupCard = ({ setToken }) => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signupUser({ username, password, email });
      console.log(res);
      console.log(document.cookie);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className='w-full max-w-xs'>
      <form
        className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
        novalidate='novalidate'
        onSubmit={handleSubmit}
      >
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            for='email'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:shadow-outline'
            id='email'
            type='text'
            name='email'
            placeholder='Email'
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
        <div className='mb-4'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            for='username'
          >
            Username
          </label>
          <input
            className='shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:shadow-outline'
            id='username'
            type='text'
            name='username'
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
            required
          ></input>
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 text-sm font-bold mb-2'
            for='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full px-3 py-2 mb-3 text-gray-700 leading-tight focus:shadow-outline'
            id='password'
            type='password'
            name='password'
            placeholder='Super Secret Password'
            onChange={(e) => setPassword(e.target.value)}
            required
          ></input>
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded focus:shadow-outline'
            type='submit'
            formnovalidate
          >
            Sign Up
          </button>
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

export default SignupCard;
