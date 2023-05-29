import React from 'react';
import SpiderImage from 'src/assets/images/about__4_115238.png';
import SnakeImage from 'src/assets/images/about__1_564492.png';
import PumaImage from 'src/assets/images/about__162017030_10159063249289605_109080919206032126_n_1.png';
import PenguinImage from 'src/assets/images/about_Untitledp_1.png';
import Vector1Image from 'src/assets/images/about_Vector_1.png';
import './styles.scss'
import { useNavigate } from 'react-router-dom';

function Privacy(props) {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate('/menu');
  };
  return (
    <div id='mainP' className={props.className}>
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
      <div id='descriptionP'>
        <div id='privacy'>{`Privacy
        `}</div>
        <div id='textPrivacy'>
          {`

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras laoreet quam eu est malesuada posuere. Praesent luctus vitae arcu et interdum. Sed ex elit, tristique eu urna vel, elementum volutpat nunc. Nulla porttitor fringilla ante, non posuere eros iaculis et. Morbi fermentum sem sem. Duis ullamcorper nec nulla vitae facilisis. Curabitur vitae gravida lectus, vel tempor eros.
  Nullam suscipit pulvinar dui nec sodales. Aliquam ac ex sed arcu consectetur egestas vel at ligula. Sed varius ornare nulla. Nulla facil Aliquam ac ex sed arcu consectetur egestas vel at ligula. Sed varius ornare nulla. Nulla facilisi. Pellentesque suscipit eros at eleifend euismod. Aenean blandit, nunc eu malesuada lobortis.`}
        </div>
      </div>

    </div>
  );
}

export default Privacy;
