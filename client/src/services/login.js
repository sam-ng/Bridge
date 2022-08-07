const SERVER_URL = `${process.env.REACT_APP_SERVER_SCHEME}${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`;

export const signupUser = async (credentials) => {
  return fetch(`${SERVER_URL}/auth/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export const loginUser = async (credentials) => {
  return fetch(`${SERVER_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export const refreshToken = async () => {
  return fetch(`${SERVER_URL}/auth/refreshToken`, {
    credentials: 'include',
  }).then((data) => data.json());
};
