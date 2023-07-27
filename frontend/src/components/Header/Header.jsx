import React from 'react';
import avatar from '../../assets/images/menu/avatar.png'
import './Header.scss'
import { useNavigate } from 'react-router-dom';

const Header = ({ url, linkUser, back="rgb(26, 0, 36)" }) => {

    
    const navigate = useNavigate();

    const handleMenuClick = () => {
        navigate('/menu'); 
    };

    const handleGeneratorClick = () => {
        navigate('/playlists'); 
    };


    return (
        <div className='header' style={{backgroundColor:`${back}`}}>
        <div className='headTastyfy' onClick={handleMenuClick}>Tastyfy</div>
        <div className='menu'>
            <div className='menuItem' onClick={handleMenuClick}>Analytics</div>
            <div className='menuItem PG' onClick={handleGeneratorClick}>Playlist Generator</div>
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
