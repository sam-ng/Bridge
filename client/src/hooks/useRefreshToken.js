import { SERVER_URL } from '../constants/api';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const res = await fetch(`${SERVER_URL}/auth/refresh`, {
      credentials: 'include',
    });
    const data = await res.json();
    setAuth((prevState) => ({ ...prevState, accessToken: data.accessToken }));
    return res.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
