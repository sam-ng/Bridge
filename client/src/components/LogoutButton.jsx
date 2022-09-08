import { useNavigate } from 'react-router-dom';

import { SERVER_URL } from '../constants/api';

import useAuth from '../hooks/useAuth';

export const LogoutButton = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    setAuth({});
    try {
      await fetch(`${SERVER_URL}/auth/logout`, { credentials: 'include' });
      navigate('/login', { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <button
      className='w-full flex items-center text-base font-normal rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 p-2'
      onClick={handleLogout}
    >
      Logout
    </button>
  );
};

export default LogoutButton;
