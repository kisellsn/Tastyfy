
import React from 'react';
import { Link} from 'react-router-dom';
import VectorImage from 'src/assets/images/start1_Vector.png';
import './footer.scss';

function Footer() {
    const currentPage = window.location.pathname;

    return (
        <div className={`footer ${currentPage === '/about' ? 'about' : ''}`}>
            <div className={`Email ${currentPage === '/about' ? 'about' : ''}`}>
                <img className={`Vector ${currentPage === '/about' ? 'about' : ''}`} src={VectorImage} loading="lazy" alt={'Vector'} /> 
            </div>
            <div id={`${currentPage === '/about' ? 'PrivacyFaq' : 'AboutPrivacyFaq'}`}>
                {currentPage === '/about' ? (
                    <React.Fragment>
                        Privacy<br/>
                        FAQ<br/>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <Link to="/about">About</Link><br/>
                        Privacy<br/>
                        FAQ<br/>
                    </React.Fragment>
                )}
            </div>
        </div>   
    );
}

export default Footer;
