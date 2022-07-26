import React from 'react';
import SignupCard from '../components/SignupCard';
import PropTypes from 'prop-types';

const Signup = ({ setToken }) => {
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
      <div className='font-Rubik text-6xl'>Create an Account</div>
      <SignupCard setToken={setToken} />
    </div>
  );
};

Signup.propTypes = {
  setToken: PropTypes.func.isRequired,
};

export default Signup;
