import React from 'react';
import SignupCard from '../components/SignupCard';

const Signup = () => {
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center'>
      <div className='font-Rubik text-6xl'>Create an Account</div>
      <SignupCard />
    </div>
  );
};

export default Signup;
