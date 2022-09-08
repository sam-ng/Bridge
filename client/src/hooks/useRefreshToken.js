import { useCallback } from 'react';

import { SERVER_URL } from '../constants/api';
import useAuth from './useAuth';

const useRefreshToken = () => {
  const { setAuth } = useAuth();

  const refresh = useCallback(async () => {
    const res = await fetch(`${SERVER_URL}/auth/refresh`, {
      credentials: 'include',
    });
    const { user, accessToken } = await res.json();
    setAuth((prevState) => ({ ...prevState, user, accessToken }));
    return accessToken;
  }, [setAuth]);

  return refresh;
};

export default useRefreshToken;
