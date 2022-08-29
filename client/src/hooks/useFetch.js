import { useEffect, useReducer, useRef } from 'react';

const useFetch = (url, options) => {
  let cancelRequest = useRef(false);

  const initialState = {
    data: undefined,
    isLoading: false,
    error: undefined,
  };

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { ...initialState, isLoading: true };
      case 'FETCHED':
        return { ...initialState, data: action.payload, isLoading: false };
      case 'ERROR':
        return { ...initialState, error: action.payload, isLoading: false };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    cancelRequest.current = false;

    const fetchData = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const response = await fetch(url, options);
        const data = await response.json();
        if (cancelRequest.current) return;
        dispatch({ type: 'FETCHED', payload: data });
      } catch (err) {
        if (cancelRequest.current) return;
        dispatch({ type: 'ERROR', payload: err.message });
      }
    };

    fetchData();

    return () => {
      cancelRequest.current = true;
    };
  }, [url]);

  return state;
};

export default useFetch;
