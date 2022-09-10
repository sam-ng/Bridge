import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import validator from 'validator';

import { signupUser } from '../services/login';

const USER_REGEX = /^[a-zA-z][a-zA-Z0-9-_]{0,99}$/;
const PASSWORD_REGEX =
  /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const SignupCard = () => {
  const [username, setUsername] = useState('');
  const [validUsername, setValidUsername] = useState(false);
  const [usernameFocus, setUsernameFocus] = useState(false);

  const [password, setPassword] = useState('');
  const [validPassword, setValidPassword] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  const [email, setEmail] = useState('');
  const emailRef = useRef();

  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();

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
    // TODO: update this -> hardcoded for ease of testing
    // const validPassword = PASSWORD_REGEX.test(password);
    const validPassword = true;
    const validEmail = validator.isEmail(email);

    if (!validUsername || !validPassword || !validEmail) {
      console.log('error');
      return;
    }

    try {
      await signupUser({ username, password, email });
      navigate('/login', { replace: true });
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
        <div className='mb-6'>
          <h3 className='text-center font-bold text-lg'>Create an account</h3>
        </div>
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
