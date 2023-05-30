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

  return (
    <div id='main' className={props.className}>
      <img
        id='VectorSmartObject1'
        src={VectorSmartObject1Image}
        loading="lazy"
        alt={'Vector Smart Object 1'}
      />
      <div id='Group2'>
        <div id='Rectangle4' onClick={handleAuth}>
          <div id='LogIn'>{`Log In`}</div>
          <img id='Vector1' src={Vector1Image} loading="lazy" alt={'Vector'} />
        </div>
      </div>
      <div id='Tastyfy'>{`Tastyfy`}</div>
      <div id='Tastyfy1'>
        <span id='Tastyfy1Span1'>{`Tastyfy`}</span>
        <span id='Tastyfy1Span2'>{` is a music preference analyzer that helps users learn more about their taste and discover new music that matches their personal preferences.`}</span>
      </div>
    </div>
  );
}

export default Login;
