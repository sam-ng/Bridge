import { useCallback } from 'react';

import { SERVER_URL } from '../constants/api';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    const res = await fetch(`${SERVER_URL}/auth/refresh`, {
      credentials: 'include',
    });
    const { username, accessToken } = await res.json();
    console.log(accessToken);
    setAuth((prevState) => ({ ...prevState, username, accessToken }));
    return accessToken;
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;
