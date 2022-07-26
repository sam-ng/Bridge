import React from 'react';
import LoginCard from '../components/LoginCard';
import PropTypes from 'prop-types';
import { loginUser } from '../services/login';

const Login = ({ setToken }) => {
  // loginUser();
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
      <div className='font-Rubik text-6xl'>BRIDGE</div>
      <LoginCard setToken={setToken} />
    </div>
  );
};

Login.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Login;
