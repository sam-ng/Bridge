import { useEffect, useReducer } from 'react';

const useFetch = (url) => {
  const initialState = {
    data: undefined,
    error: undefined,
  };

  const fetchReducer = (state, action) => {
    switch (action.type) {
      case 'LOADING':
        return { ...initialState };
      case 'FETCHED':
        return { ...initialState, data: action.payload };
      case 'ERROR':
        return { ...initialState, error: action.payload };
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    if (!url) return;

    const fetchData = async () => {
      dispatch({ type: 'LOADING' });
      try {
        const response = await fetch(url);
        const data = await response.json();
        if (cancelRequest) return;
        dispatch({ type: 'FETCHED', payload: data });
      } catch (err) {
        if (cancelRequest) return;
        dispatch({ type: 'ERROR', payload: err.message });
      }
    };
    fetchData();

    return () => {
      cancelRequest = true;
    };
  }, [url]);

  return { data, loading, error };
};

export default useFetch;
