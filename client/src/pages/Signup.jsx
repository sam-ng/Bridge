import React from 'react';
import SignupCard from '../components/SignupCard';

const Signup = () => {
  return (
    <div className='flex flex-col h-screen w-full justify-center items-center bg-gradient-radial from-blue-100 via-blue-300 to-blue-500'>
      <div className='font-Rubik text-6xl text-black mb-6'>BRIDGE</div>
      <SignupCard />
    </div>
  );
};

export default Signup;
