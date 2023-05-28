import React from 'react';
import SpiderImage from 'src/assets/images/about__4_115238.png';
import SnakeImage from 'src/assets/images/about__1_564492.png';
import PumaImage from 'src/assets/images/about__162017030_10159063249289605_109080919206032126_n_1.png';
import PenguinImage from 'src/assets/images/about_Untitledp_1.png';
import Vector1Image from 'src/assets/images/about_Vector_1.png';
import './About.scss'
import { useNavigate } from 'react-router-dom';

function About(props) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/menu');
  };
  return (
    <div id='mainA' className={props.className}>
      <div id='SpotifyLogoS'></div>
      <div id='leftRectangle'>
        <div id='tastyfy'>{`Tastyfy`}</div>
        <div id='backRectangle' onClick={handleGoBack}>
            <div id='q1'>
                <img id='vector1' src={Vector1Image} loading="lazy" alt={'Vector'} />
            </div>
            <div id='back'>Back</div>
        </div>
      </div>
        <img id='puma'
            src={PumaImage}
            loading="lazy"
            alt={'Sonya Kondratska'}/>
        <img id='snake'
            src={SnakeImage} 
            loading="lazy" 
            alt={'Andrii Mieshkov'} />
        <img id='spider'
            src={SpiderImage} 
            loading="lazy" 
            alt={'Tykhonenko Mykyta'} />
        <img id='penguin'
            src={PenguinImage} 
            loading="lazy" 
            alt={'Shabanov Metin'} />


        <div id='sonyaKondratskaBackE'>
            <span id='sonyaKondratskaBackESpan1'>{`Sonya Kondratska

`}</span>
            <span id='sonyaKondratskaBackESpan2'>{`Back-end Developer`}</span>
            <div id='rectangle60'></div>
        </div>
        <div id='andriiMieshkovFrontE'>
            <span id='andriiMieshkovFrontESpan1'>{`Andrii Mieshkov

`}</span>
            <span id='andriiMieshkovFrontESpan2'>{`Front-end Developer`}</span>
            <div id='rectangle61'></div>
        </div>
        <div id='tykhonenkoMykytaUiUx'>
            <span id='tykhonenkoMykytaUiUxSpan1'>{`Tykhonenko Mykyta

`}</span>
            <span id='tykhonenkoMykytaUiUxSpan2'>{`UI/UX Designer`}</span>
            <div id='rectangle62'></div>
        </div>
        <div id='shabanovMetinDataAna'>
            <span id='shabanovMetinDataAnaSpan1'>{`Shabanov Metin

`}</span>
            <span id='shabanovMetinDataAnaSpan2'>{`Data Analyst`}</span>
            <div id='rectangle63'></div>
        </div>
      <div id='description'>
        <div id='about'>{`About
        `}</div>
        <div id='textAbout'>
          {`

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet quam eu est malesuada posuere. Praesent luctus vitae arcu et interdum. Sed ex elit, tristique eu urna vel, elementum volutpat nunc. Nulla porttitor fringilla ante, non posuere eros iaculis et. Morbi fermentum sem sem. Duis ullamcorper nec nulla vitae facilisis. Curabitur vitae gravida lectus, vel tempor eros.
  Nullam suscipit pulvinar dui nec sodales. Aliquam ac ex sed arcu consectetur egestas vel at ligula. Sed varius ornare nulla. Nulla facil Aliquam ac ex sed arcu consectetur egestas vel at ligula. Sed varius ornare nulla. Nulla facilisi. Pellentesque suscipit eros at eleifend euismod. Aenean blandit, nunc eu malesuada lobortis.`}
        </div>
      </div>

    </div>
  );
}

export default About;
