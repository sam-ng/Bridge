export const signupUser = async (credentials) => {
  const serverURL = `${process.env.REACT_APP_SERVER_SCHEME}://${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`;

  return fetch(`${serverURL}/signup`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};

export const loginUser = async (credentials) => {
  const serverURL = `${process.env.REACT_APP_SERVER_SCHEME}${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`;

  return fetch(`${serverURL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  }).then((data) => data.json());
};
