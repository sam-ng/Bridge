import { SERVER_URL } from '../constants/api';
import useFetch from './useFetch';

const useLogin = (credentials) => {
  return () =>
    useFetch(`${SERVER_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    });
};

export default useLogin;
