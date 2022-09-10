const SERVER_URL = `${process.env.REACT_APP_SERVER_SCHEME}${process.env.REACT_APP_SERVER_DOMAIN}:${process.env.REACT_APP_SERVER_PORT}`;

export const addMacro = async (body) => {
  return fetch(`${SERVER_URL}/macro/add`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  }).then((data) => data.json());
};

export const deleteMacro = async (body) => {
  return fetch(`${SERVER_URL}/macro/delete`, {
    method: 'POST',
    mode: 'cors',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(body),
  }).then((data) => data.json());
};
