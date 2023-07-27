
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
          await axios.get('/logout');
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
