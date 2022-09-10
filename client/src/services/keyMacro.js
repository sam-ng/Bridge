import { SERVER_URL } from '../constants/api';

import { fetchPrivate } from './fetchPrivate';

export const addMacro = async (params, accessToken, refresh) => {
  return fetchPrivate(
    `${SERVER_URL}/user/macro/add`,
    {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    },
    accessToken,
    refresh
  ).then((data) => data.json());
};

export const deleteMacro = async (params, accessToken, refresh) => {
  return fetchPrivate(
    `${SERVER_URL}/user/macro/delete`,
    {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify(params),
    },
    accessToken,
    refresh
  ).then((data) => data.json());
};
