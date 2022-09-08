import { useEffect, useReducer, useRef, useState } from 'react';

import useAuth from './useAuth';
import useRefreshToken from './useRefreshToken';

const useFetchPrivate = (initialUrl, initialOptions = {}) => {
  let cancelRequest = useRef(false);
  const { auth } = useAuth();
  const refresh = useRefreshToken();

  const initialState = {
    data: undefined,
    loading: false,
    error: undefined,
  };

  const [url, setUrl] = useState(initialUrl);
  const [options, setOptions] = useState(initialOptions);

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { ...initialState, loading: true };
      case 'FETCHED':
        return { ...initialState, data: action.payload, loading: false };
      case 'ERROR':
        return { ...initialState, error: action.payload, loading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  const fetchData = async () => {
    try {
      dispatch({ type: 'LOADING' });

      // Add access token to Authorization header
      if (auth && auth.accessToken) {
        let headers = options && options.headers ? options.headers : {};
        headers['Authorization'] = `Bearer ${auth.accessToken}`;
        options.headers = headers;
      }

      let response = await fetch(url, options);

      //  If access token rejected, see if refreshing it works

      if (response.status === 403) {
        const newAccessToken = await refresh();
        let headers = options && options.headers ? options.headers : {};
        headers['Authorization'] = `Bearer ${newAccessToken}`;
        options.headers = headers;

        response = await fetch(url, options);
        if (response.status === 403)
          dispatch({ type: 'ERROR', payload: 'Unauthorized.' });
      }

      const data = await response.json();
      if (cancelRequest.current) return;
      dispatch({ type: 'FETCHED', payload: data });
    } catch (err) {
      if (cancelRequest.current) return;
      dispatch({ type: 'ERROR', payload: err.message });
    }
  };

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url, options]);

  return { ...state, setUrl, setOptions };
};

export default useFetchPrivate;
