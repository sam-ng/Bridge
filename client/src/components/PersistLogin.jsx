import { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth } = useAuth();

  const accessToken = auth?.accessToken;
  console.log(auth);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    console.log('persist');
    console.log(accessToken);
    !accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [accessToken, refresh]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />} </>;
};

export default PersistLogin;
