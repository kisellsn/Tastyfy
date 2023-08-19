import React from 'react';
import avatar from '../../assets/images/menu/avatar.png'
import './Header.scss'
import { useNavigate } from 'react-router-dom';

const Header = ({ url, linkUser, back="rgb(26, 0, 36)" }) => {

    
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/'); 
    };
    const handleMenuClick = () => {
        navigate('/menu'); 
    };

    const handleGeneratorClick = () => {
        navigate('/playlists'); 
    };


    let newBack;
    let screenWidth = window.innerWidth;
    let genWord = "Playlist Generator";
    if(screenWidth < 675){
        newBack = 'transparent';
        genWord = "Generator"
    } else{
        newBack = back;
    }
    let currentURL = window.location.pathname;



    return (
        <div className='header' style={{backgroundColor:`${newBack}`}}>
        <div className='headTastyfy' onClick={handleLoginClick}>Tastyfy</div>
        <div className='menu'>
            <div className={`menuItem ${(currentURL === "/menu")  ? 'PG' : ''}`} onClick={handleMenuClick}>Analytics</div>
            <div className={`menuItem ${(currentURL === "/playlists" || currentURL === "/generator")  ? 'PG' : ''}`} onClick={handleGeneratorClick}>{genWord}</div>
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
