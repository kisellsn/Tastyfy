const TOKEN_KEY = 'spotifyToken';
const USER_KEY = 'spotifyUser';


export const storeToken = (token) => {
  localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
};

export const getTokenFromStorage = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  return token ? JSON.parse(token) : null;
};

export const storeUser = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  return (user && JSON.parse(user)) ? JSON.parse(user) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};


  // useEffect(() => {
  //   if (userName) return;
  //   getToken().then(token => {
  //     if (!token.Authorization) navigate('/');
  //   })
  //   registerSpotify().then(user => {
  //     if (!user) navigate('/');
  //     setUserInfo(user);
  //     setUserName(user.display_name);
  //   });
  // })