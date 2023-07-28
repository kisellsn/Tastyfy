import axios from 'axios';
import React, { useEffect } from 'react';
import VectorSmartObject1Image from 'src/assets/images/start1_Vector_Smart_Object_1.png';
import Vector1Image from 'src/assets/images/start1_Vector_1.png';
import './Login/Login.scss'


const Callback = () => {
    useEffect(() => {
        const handleCallback = async (code) => {
          try {
            const response = await axios.post('/redirect', {code});
            const { link } = response.data;
            window.location.href = link;
          } catch (error) {
            console.error('Callback failed', error);
          }
        };
    
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
          handleCallback(code);
        }
      }, []);

    return (
        <div id='main'>
        <img
          id='VectorSmartObject1'
          src={VectorSmartObject1Image}
          loading="eager"
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
              <div id='button-click'>
                <div id='LogIn'>{`Log In`}</div>
                <img id='SpotifyImg' src={Vector1Image} loading="lazy" alt={'Vector'} />
              </div>
            </div>
  
          </div>
        </div>
      </div>
    )
};

export default Callback;