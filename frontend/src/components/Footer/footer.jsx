
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import VectorImage from 'src/assets/images/start1_Vector.png';
import './footer.scss';
import axios from 'axios';
import { clearLocalStorage } from 'src/util/local';


function Footer() {
    const navigate = useNavigate();
    const currentPage = window.location.pathname;
    const handleLogOut = async () => {
        try {
          await axios.get('/api/logout');
          clearLocalStorage();
          navigate('/');
        } catch (error) {
          console.error('Error', error);
        }
      };

    return (
        <div className={`footer ${currentPage === '/about' ? 'about' : (currentPage === '/privacy' ? 'about' : '')}`}>
            <div className={`Email ${currentPage === '/about' ? 'about' : (currentPage === '/privacy' ? 'about' : '')}`}>
                <img className={`Vector ${currentPage === '/about' ? 'about' : (currentPage === '/privacy' ? 'about' : '')}`}
                src={VectorImage} 
                loading="lazy" 
                alt={'Vector'} 
                onClick={() => window.location.href = 'mailto:tastyfy.tech@gmail.com'}
                /> 
                <p>Contact us</p>
            </div>
            <div className={`Coffee ${currentPage === '/about' ? 'about' : (currentPage === '/privacy' ? 'about' : '')}`} style={{display:`${(currentPage === '/about' || currentPage === '/privacy') ? 'flex' : 'none'}`}}>
                <svg  
                    onClick={() => window.location.href = 'https://www.buymeacoffee.com/tastyfy'}
                    viewBox="0 0 46 46" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M33.5417 46.0001H10.5417C10.0357 46.0001 9.61687 45.6072 9.58525 45.1012L7.66858 14.4345C7.65229 14.171 7.74525 13.9112 7.92637 13.7186C8.1075 13.526 8.3605 13.4167 8.625 13.4167H35.4583C35.7228 13.4167 35.9758 13.526 36.157 13.7186C36.3381 13.9112 36.431 14.171 36.4147 14.4345L34.4981 45.1012C34.4665 45.6072 34.0477 46.0001 33.5417 46.0001ZM11.4415 44.0834H32.6408L34.4377 15.3334H9.64466L11.4415 44.0834Z" fill="white"/>
                    <path d="M37.375 15.3333H6.70833C6.17933 15.3333 5.75 14.905 5.75 14.375V6.70833C5.75 6.17838 6.17933 5.75 6.70833 5.75H37.375C37.904 5.75 38.3333 6.17838 38.3333 6.70833V14.375C38.3333 14.905 37.904 15.3333 37.375 15.3333ZM7.66667 13.4167H36.4167V7.66667H7.66667V13.4167Z" fill="white"/>
                    <path d="M35.4775 7.66667C35.4717 7.66571 35.465 7.66667 35.4583 7.66667H8.62498C8.31736 7.66667 8.02794 7.51908 7.84778 7.26896C7.66761 7.01883 7.61873 6.69683 7.71553 6.4055L9.63219 0.6555C9.76348 0.263542 10.1286 0 10.5417 0H33.5417C33.9547 0 34.3198 0.263542 34.4511 0.6555L36.3103 6.23396C36.3898 6.37388 36.4358 6.53583 36.4358 6.70833C36.4358 7.23829 36.0065 7.66667 35.4775 7.66667ZM9.95419 5.75H34.1291L32.8517 1.91667H11.2326L9.95419 5.75Z" fill="white"/>
                    <path d="M34.9791 22.9999H9.10415C8.57515 22.9999 8.14581 22.5715 8.14581 22.0416C8.14581 21.5116 8.57515 21.0833 9.10415 21.0833H34.9791C35.5081 21.0833 35.9375 21.5116 35.9375 22.0416C35.9375 22.5715 35.5081 22.9999 34.9791 22.9999Z" fill="white"/>
                    <path d="M34.2604 32.5833H9.82294V34.4999H34.2604V32.5833Z" fill="white"/>
                    <path d="M24.9166 28.7499H19.1666C18.6376 28.7499 18.2083 28.3215 18.2083 27.7916C18.2083 27.2616 18.6376 26.8333 19.1666 26.8333H24.9166C25.4456 26.8333 25.875 27.2616 25.875 27.7916C25.875 28.3215 25.4456 28.7499 24.9166 28.7499Z" fill="white"/>
                </svg>
                <p>Buy us a coffee</p>

            </div>
            <div id={currentPage === '/about' ? 'PrivacyFaq' : (currentPage === '/privacy' ? 'PrivacyFaq' : 'AboutPrivacyFaq')}>

            {currentPage === '/about' ? (
            <React.Fragment>
                <Link to="/privacy">Privacy</Link><br/>
                <div style={{ position: 'absolute', cursor: 'pointer' }} onClick={handleLogOut}>LogOut</div><br/>
            </React.Fragment>
            ) : currentPage === '/privacy' ? (
            <React.Fragment>
                <Link to="/about">About</Link><br/>
                <div style={{ position: 'absolute', cursor: 'pointer' }} onClick={handleLogOut}>LogOut</div><br/>
            </React.Fragment>
            ) : (
            <React.Fragment>
                <Link to="/about">About</Link><br/>
                <Link to="/privacy">Privacy</Link><br/>
                <div style={{ position: 'absolute', cursor: 'pointer' }} onClick={handleLogOut}>LogOut</div><br/>
            </React.Fragment>
            )}

            </div>
        </div>   
    );
}

export default Footer;
