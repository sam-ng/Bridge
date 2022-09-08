import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import validator from 'validator';

import { signupUser } from '../services/login';

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{0,99}$/;
const PASSWORD_REGEX =
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const SignupCard = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState();
  const emailRef = useRef();

  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // useEffect(() => {
  //   const valid = USER_REGEX.test(username);
  //   setValidUsername(valid);
  // }, [username]);

  // useEffect(() => {
  //   const valid = PASSWORD_REGEX.test(password);
  //   setValidPassword(valid);
  // }, [password]);

  // useEffect(() => {
  //   setErrorMessages({});
  // }, [username, password, email]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validUsername = USER_REGEX.test(username);
    const validPassword = USER_REGEX.test(password);
    const validEmail = validator.isEmail(email);

    if (!validUsername || !validPassword || !validEmail) {
      console.log('error');
      return;
    }

    try {
      const res = await signupUser({ username, password, email });
      console.log(res);
      const res2 = await fetch('http://localhost:8000/protected');
      console.log(res2);
      navigate(from, { replace: true });
    } catch (err) {
      console.log(err);
    }
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
            htmlFor='email'
          >
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full px-3 py-2 text-gray-700 leading-tight focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            ref={emailRef}
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          ></input>
        </div>
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
        <div className='flex items-center'>
          <button
            className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded focus:shadow-outline'
            type='submit'
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignupCard;
