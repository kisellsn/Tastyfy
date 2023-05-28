
import React from 'react';
import { Link, useNavigate} from 'react-router-dom';
import VectorImage from 'src/assets/images/start1_Vector.png';
import './footer.scss';
import axios from 'axios';


function Footer() {
    const navigate = useNavigate();
    const currentPage = window.location.pathname;
    const handleLogOut = async () => {
        try {
          await axios.get('/logout');
          navigate('/');
        } catch (error) {
          console.error('Error', error);
        }
      };

    return (
        <div className={`footer ${currentPage === '/about' ? 'about' : ''}`}>
            <div className={`Email ${currentPage === '/about' ? 'about' : ''}`}>
                <img className={`Vector ${currentPage === '/about' ? 'about' : ''}`} src={VectorImage} loading="lazy" alt={'Vector'} /> 
            </div>
            <div id={`${currentPage === '/about' ? 'PrivacyFaq' : 'AboutPrivacyFaq'}`}>
                {currentPage === '/about' ? (
                    <React.Fragment>
                        Privacy<br/>
                        <div style={{ position: 'absolute' }}onClick={handleLogOut}>LogOut</div><br/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/about">About</Link><br/>
                        Privacy<br/>
                        <div style={{ position: 'absolute' }} onClick={handleLogOut}>LogOut</div><br/>
                    </React.Fragment>
                )}
            </div>
        </div>   
    );
}

export default Footer;
