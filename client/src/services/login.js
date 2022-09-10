import { SERVER_URL } from '../constants/api';

export const signupUser = async (body) => {
  return fetch(`${SERVER_URL}/auth/signup`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  }).then((data) => data.json());
};

export const loginUser = async (body) => {
  return fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  }).then((data) => data.json());
};

export const refreshToken = async () => {
  const data = await fetch(`${SERVER_URL}/auth/refreshToken`, {
    credentials: 'include',
  });
  return await data.json();
};
