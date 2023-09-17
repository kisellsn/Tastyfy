const TOKEN_KEY = 'spotifyToken';
const USER_KEY = 'spotifyUser';

export const storeUser = (user) => {
  if(user)localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserFromStorage = () => {
  const user = localStorage.getItem(USER_KEY);
  if(user === undefined) return false;
  if(user && JSON.parse(user)) console.log(JSON.parse(user));
  return (user && JSON.parse(user)) ? JSON.parse(user) : null;
};

export const clearLocalStorage = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
  localStorage.removeItem('tops');
  localStorage.removeItem('recommendations');
  localStorage.removeItem('text');
  localStorage.removeItem('topTerm');
  localStorage.removeItem('topDiagram');
  localStorage.removeItem('sircleDiagram');
  localStorage.removeItem('featureDiagram');
  localStorage.removeItem('playlist');
  localStorage.removeItem('tracks');
};

export const getCookie = (cname='session') => {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

export const getTopsLocal = (key) =>{
  const tops = localStorage.getItem(key);
  if(tops === undefined) return false;
  return (tops && JSON.parse(tops)) ? JSON.parse(tops) : null;
}

export const newLocal = (key, data) =>{
  if(data === undefined)localStorage.setItem(key, []);
  else localStorage.setItem(key, JSON.stringify(data));
}


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