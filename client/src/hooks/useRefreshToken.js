import useAuth from './useAuth';
import { refreshToken } from '../services/login';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    res = await refreshToken();
    setAuth((prevState) => ({ ...prevState, accessToken: res.accessToken }));
    return res.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
