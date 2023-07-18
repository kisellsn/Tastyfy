import React from 'react';
import axios from 'axios';
import VectorSmartObject1Image from 'src/assets/images/start1_Vector_Smart_Object_1.png';
import Vector1Image from 'src/assets/images/start1_Vector_1.png';
import './Login.scss'


function Login(props) {

  const handleAuth = async () => {
    try {
      const response = await axios.get('/api/auth');
      const { link } = response.data;
      window.location.href = link;
    } catch (error) {
      console.error('Authentication failed', error);
    }
  };
  // useEffect(() => {
  //   const handleWindowLoad = () => {
  //     const screenHeight = window.innerHeight;
  //     const mainElement = document.getElementById('main');
  //     if (mainElement) {
  //       mainElement.style.minHeight = screenHeight + 'px';
  //     }
  //   };

  //   window.addEventListener('load', handleWindowLoad);

  //   return () => {
  //     window.removeEventListener('load', handleWindowLoad);
  //   };
  // }, []);

  return (
    <div id='main' className={props.className}>
      <img
        id='VectorSmartObject1'
        src={VectorSmartObject1Image}
        loading="lazy"
        alt={'Vector Smart Object 1'}
      />
      <div className='container'>

        <div id='Tastyfy-title'>{`Tastyfy`}</div>

        <div className='login-body'>
          <div id='Tastyfy-info'>
            <span id='Tastyfy-info-title'>{`Tastyfy`}</span>
            <span id='Tastyfy-info-info'>{` is a music preference analyzer that helps users learn more about their taste and discover new music that matches their personal preferences.`}</span>
          </div>

          <div id='login-button'>
            <div id='button-click' onClick={handleAuth}>
              <div id='LogIn'>{`Log In`}</div>
              <img id='SpotifyImg' src={Vector1Image} loading="lazy" alt={'Vector'} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;
