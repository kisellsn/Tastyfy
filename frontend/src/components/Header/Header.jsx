import React from 'react';
import avatar from '../../assets/images/menu/avatar.png'
import { useNavigate } from 'react-router-dom';

const Header = ({ url, linkUser }) => {
    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate('/menu'); 
    };

    const handleAnalyticsClick = () => {
        navigate('/menu'); 
    };


    return (
        <div id='header'>
        <div id='headTastyfy' onClick={handleMenuClick}>Tastyfy</div>
        <div id='menu'>
            <div className='menuItem' onClick={handleAnalyticsClick}>Analytics</div>
            <div className='menuItem PG'>Playlist Generator</div>
        </div>
        <img 
            id='avatar' 
            src={url || avatar} 
            loading="lazy" 
            alt={'Avatar'} 
            onClick={linkUser}
        />
        </div>
    );
};

export default Header;
