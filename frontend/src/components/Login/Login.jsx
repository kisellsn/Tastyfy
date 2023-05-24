import React from 'react';
import { useNavigate } from 'react-router-dom';
import VectorSmartObject1Image from 'src/assets/images/start1_Vector_Smart_Object_1.png';
import Vector1Image from 'src/assets/images/start1_Vector_1.png';
import './Login.scss'

function Login(props) {
  const navigate = useNavigate();

  const Analytics = () => {
    navigate('/menu');
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
        <div id='Rectangle4' onClick={Analytics}>
          <div id='LogIn'>{`Log In`}</div>
          <img id='Vector1' src={Vector1Image} loading="lazy" alt={'Vector'} />
        </div>
      </div>
      <div id='Tastyfy'>{`Tastyfy`}</div>
      <div id='Tastyfy1'>
        <span id='Tastyfy1Span1'>{`Tastyfy`}</span>
        <span id='Tastyfy1Span2'>{` – це аналізатор музичних уподобань, який допомагає користувачам дізнатися більше про свій смак та відкривати для себе нову музику, яка
відповідає їхнім особистим вподобанням.`}</span>
      </div>
    </div>
  );
}

export default Login;
