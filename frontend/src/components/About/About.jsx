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
      <div className='containerA'>
        <div id='leftRectangleA'>
          <div id='tastyfyA'>{`Tastyfy`}</div>
          <div id='backRectangleA' onClick={handleGoBack}>
              <img id='vector1A' src={Vector1Image} loading="lazy" alt={'Vector'} />
              <div id='backA'>Back</div>
          </div>
        </div>
        <div className='about-body'>
          <div className='team'>
            <div className='team-card'>
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
            <div className='team-card'>
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
            <div className='team-card'>
              <img 
                src={SpiderImage} 
                loading="lazy" 
                alt={'Tykhonenko Mykyta'}   
              />
              <div className='team-card-info'>
                <h3>Tykhonenko Mykyta</h3>
                <div className='team-card-rectangle'></div>
                <h3>UI/UX Designer</h3>
              </div>
            </div>
            <div className='team-card'>
              <img 
                src={PenguinImage} 
                loading="lazy" 
                alt={'Shabanov Metin'}
              />
              <div className='team-card-info'>
                <h3>Shabanov Metin</h3>
                <div className='team-card-rectangle'></div>
                <h3>Data Analyst</h3>
              </div>
            </div>
          </div>
          <div id='descriptionA'>
            <h2>About</h2>
            <div id='textAbout'>
              <p>Welcome to Tastyfy!</p>
              <p>Tastyfy is a revolutionary music preference analyzer designed to help you delve deeper into your musical tastes and uncover new music that resonates with your personal preferences. With our innovative platform, we bring together a team of talented individuals who are passionate about music and technology to enhance your music discovery journey.</p>
              <h3>Meet Our Team</h3>
              <h4>Sonya Kondratska - Back-end Developer</h4>
              <p>Sonya is the mastermind behind the technical infrastructure that powers Tastyfy. With her expertise in back-end development, she ensures that our platform operates smoothly, securely, and efficiently. She is committed to delivering a seamless user experience, enabling you to explore your music preferences effortlessly.</p>
              <h4>Andrii Mieshkov - Front-end Developer</h4>
              <p>Andrii is responsible for the visual and interactive aspects of Tastyfy. Using his skills in front-end development, he creates an intuitive and engaging user interface that makes navigating through the platform a delightful experience. Andrii works tirelessly to bring your music preferences to life and ensure that you have a seamless interaction with Tastyfy.</p>
              <h4>Tykhonenko Mykyta - UI/UX Designer</h4>
              <p>Tykhonenko's expertise lies in crafting captivating user experiences. As the UI/UX designer for Tastyfy, he combines aesthetics with functionality, designing a visually appealing interface that complements the overall user journey. Tykhonenko's goal is to make your time on Tastyfy enjoyable, visually stimulating, and easy to navigate.</p>
              <h4>Shabanov Metin - Data Analyst</h4>
              <p>Metin is the brains behind the data analysis at Tastyfy. With his analytical skills and music expertise, he dives into the vast world of music data to uncover hidden connections and patterns. By analyzing your music preferences, Metin continuously enhances the algorithms that power Tastyfy, ensuring that the music recommendations you receive are tailored specifically to your unique taste.</p>
              <p>At Tastyfy, we believe that music has the power to enrich our lives and connect us on a deeper level. Our mission is to empower you to explore your music preferences, expand your musical horizons, and make discovering new music an exciting and personalized journey.</p>
              <p>Whether you're a seasoned music aficionado or just beginning to explore the vast world of music, Tastyfy is here to accompany you on your musical adventure. So, dive in, uncover your musical preferences, and let Tastyfy be your guide to a world of endless musical possibilities.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
