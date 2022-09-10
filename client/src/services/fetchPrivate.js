export const fetchPrivate = async (url, options, accessToken, refresh) => {
  // Add access token to Authorization header
  try {
    if (accessToken) {
      let headers = options && options.headers ? options.headers : {};
      headers['Authorization'] = `Bearer ${accessToken}`;
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
    }
    return response;
  } catch (err) {
    return err;
  }
};
