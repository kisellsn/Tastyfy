import React, { useState } from 'react';
import SpiderImage from 'src/assets/images/about__4_115238.png';
import SnakeImage from 'src/assets/images/about__1_564492.png';
import PumaImage from 'src/assets/images/about__162017030_10159063249289605_109080919206032126_n_1.png';
import PenguinImage from 'src/assets/images/about_Untitledp_1.png';
import Vector1Image from 'src/assets/images/about_Vector_1.png';
import './About.scss'
import { useNavigate } from 'react-router-dom';

function About(props) {
  const navigate = useNavigate();
  const [mate, setMate] = useState(0)

  const handleGoBack = () => {
    navigate('/menu');
  };

  const handlePlusMate =() => {
    let newMate = mate+1
    if(newMate>3)newMate=newMate-4
    setMate(newMate)
  }
  const handleMinusMate =() => {
    let newMate = mate-1
    if(newMate<0)newMate=newMate+4
    setMate(newMate)
  }
  return (
    <div id='mainA' className={props.className}>
      <div className='containerA'>
        <div id='leftRectangleA'>
          <div id='tastyfyA' onClick={handleGoBack}>{`Tastyfy`}</div>
          <div id='backRectangleA' onClick={handleGoBack}>
              <img id='vector1A' src={Vector1Image} loading="lazy" alt={'Vector'} />
              <div id='backA'>Back</div>
          </div>
        </div>
        <div className='about-body'>
        <div id='descriptionA-1'>
          <h2>About</h2>
        </div>
          <div className='team'>
            <div className='hiddenArrow'>
              <svg onClick={handleMinusMate} width="100" viewBox="0 0 88 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_15_86)" filter="url(#filter0_d_15_86)">
                <path d="M51.7 66.47L52.9933 64.5509L40.4917 46L52.9933 27.4491L51.7 25.53L37.905 46L51.7 66.47Z" fill="white"/>
                </g>
                <g filter="url(#filter1_f_15_86)">
                <circle cx="44" cy="46" r="9" transform="rotate(-180 44 46)" fill="#FFF8F8" fillOpacity="0.7"/>
                </g>
                <defs>
                <filter id="filter0_d_15_86" x="26" y="23" width="39" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_86"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_86" result="shape"/>
                </filter>
                <filter id="filter1_f_15_86" x="0" y="2" width="88" height="88" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="17.5" result="effect1_foregroundBlur_15_86"/>
                </filter>
                <clipPath id="clip0_15_86">
                <rect width="31" height="46" fill="white" transform="matrix(-1 0 0 -1 61 69)"/>
                </clipPath>
                </defs>
              </svg>
            </div>
            <div className={`team-card ${mate !== 0 ? 'hidden' : ''}`}>
              <img 
                src={PumaImage}
                loading="lazy"
                alt={'Sonya Kondratska'}
              />
              <div className='team-card-info'>
                <h3>Sonya Kondratska</h3>
                <div className='team-card-rectangle'></div>
                <h3>Back-end Developer</h3>
              </div>
            </div>
            <div className={`team-card ${mate !== 1 ? 'hidden' : ''}`}>
              <img 
                src={SnakeImage} 
                loading="lazy" 
                alt={'Andrii Mieshkov'}
              />
              <div className='team-card-info'>
                <h3>Andrii Mieshkov</h3>
                <div className='team-card-rectangle'></div>
                <h3>Front-end Developer</h3>
              </div>
            </div>
            <div className={`team-card ${mate !== 2 ? 'hidden' : ''}`}>
              <img 
                src={SpiderImage} 
                loading="lazy" 
                alt={'Mykyta Tykhonenko'}   
              />
              <div className='team-card-info'>
                <h3>Mykyta Tykhonenko</h3>
                <div className='team-card-rectangle'></div>
                <h3>UI/UX Designer</h3>
              </div>
            </div>
            <div className={`team-card ${mate !== 3 ? 'hidden' : ''}`}>
              <img 
                src={PenguinImage} 
                loading="lazy" 
                alt={'Metin Shabanov'}
              />
              <div className='team-card-info'>
                <h3>Metin Shabanov</h3>
                <div className='team-card-rectangle'></div>
                <h3>Data Analyst</h3>
              </div>
            </div>
            <div className='hiddenArrow'>
              <svg onClick={handlePlusMate} width="100%" viewBox="0 0 88 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_15_85)" filter="url(#filter0_d_15_85)">
                <path d="M36.3 24.53L35.0067 26.4491L47.5083 45L35.0067 63.5509L36.3 65.47L50.095 45L36.3 24.53Z" fill="white"/>
                </g>
                <g filter="url(#filter1_f_15_85)">
                <circle cx="44" cy="45" r="9" fill="#FFF8F8" fillOpacity="0.7"/>
                </g>
                <defs>
                <filter id="filter0_d_15_85" x="23" y="22" width="39" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                <feOffset dy="4"/>
                <feGaussianBlur stdDeviation="2"/>
                <feComposite in2="hardAlpha" operator="out"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_85"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_85" result="shape"/>
                </filter>
                <filter id="filter1_f_15_85" x="0" y="1" width="88" height="88" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
                <feGaussianBlur stdDeviation="17.5" result="effect1_foregroundBlur_15_85"/>
                </filter>
                <clipPath id="clip0_15_85">
                <rect width="31" height="46" fill="white" transform="translate(27 22)"/>
                </clipPath>
                </defs>
              </svg>
            </div>
          </div>
          <div id='descriptionA'>
            <h2>About</h2>
            <div id='textAbout'>

              <div className={`${mate !== 0 ? 'hidden' : ''}`}>
                <h4>Sonya Kondratska - Back-end Developer</h4>
                <p>Sonya is the mastermind behind the technical infrastructure that powers Tastyfy. With her expertise in back-end development, she ensures that our platform operates smoothly, securely, and efficiently. She is committed to delivering a seamless user experience, enabling you to explore your music preferences effortlessly.</p>
              </div>

              <div className={`${mate !== 1 ? 'hidden' : ''}`}>
                <h4>Andrii Mieshkov - Front-end Developer</h4>
                <p>Andrii is responsible for the visual and interactive aspects of Tastyfy. Using his skills in front-end development, he creates an intuitive and engaging user interface that makes navigating through the platform a delightful experience. Andrii works tirelessly to bring your music preferences to life and ensure that you have a seamless interaction with Tastyfy.</p>
              </div>

              <div className={`${mate !== 2 ? 'hidden' : ''}`}>  
                <h4>Mykyta Tykhonenko - UI/UX Designer</h4>
                <p>Mykyta's expertise lies in crafting captivating user experiences. As the UI/UX designer for Tastyfy, he combines aesthetics with functionality, designing a visually appealing interface that complements the overall user journey. Mykyta's goal is to make your time on Tastyfy enjoyable, visually stimulating, and easy to navigate.</p>
              </div>

              <div className={`${mate !== 3 ? 'hidden' : ''}`}>  
                <h4>Metin Shabanov - Data Analyst</h4>
                <p>Metin is the brains behind the data analysis at Tastyfy. With his analytical skills and music expertise, he dives into the vast world of music data to uncover hidden connections and patterns. By analyzing your music preferences, Metin continuously enhances the algorithms that power Tastyfy, ensuring that the music charts you receive are tailored specifically to your unique taste.</p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
