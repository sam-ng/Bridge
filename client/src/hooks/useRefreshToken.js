import { SERVER_URL } from '../constants/api';
import useAuth from './useAuth';
import useFetch from './useFetch';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = async () => {
    const { data, isLoading, error } = await useFetch(
      `${SERVER_URL}/auth/refreshToken`,
      {
        credentials: 'include',
      }
    );
    setAuth((prevState) => ({ ...prevState, accessToken: data.accessToken }));
    return res.accessToken;
  };

  return refresh;
};

export default useRefreshToken;
