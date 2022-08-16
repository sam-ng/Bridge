import { SERVER_URL } from '../constants/api';
import useFetch from './useFetch';

const useSignup = (credentials) => {
  return () =>
    useFetch(`${SERVER_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(credentials),
    });
};

export default useSignup;
