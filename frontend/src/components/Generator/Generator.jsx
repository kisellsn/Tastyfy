import React, { useEffect, useRef, useState } from 'react';
import '../PlaylistGenerator/styles.scss'
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { clearLocalStorage, getUserFromStorage, storeUser } from 'src/util/local';
import { usePlaylistContext } from 'src/context/playlistContext';


function Generator(props) {
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();
    const startRef = useRef(Date.now());
    const {playlist} = usePlaylistContext();
    useEffect(() => {
        const checkAuthorization = () => {
          const user = getUserFromStorage();
          if (Date.now() - startRef > 3600000) {
            clearLocalStorage();
            navigate('/');
          } else {
            storeUser(user);
            setUserInfo(user);
          }
        };

        const checkPlaylist = () => {
            if(!playlist || playlist.length !== 5)navigate('/playlists');
        }
    
        checkAuthorization();
        checkPlaylist(); 
        
      }, [navigate, playlist]);

    let url = ''
    if (userInfo.images) url=userInfo.images[0].url
  
    const linkUser = () => {
      const url = userInfo.external_urls.spotify;
      window.location.href = url;
    };


    return (
        <div id='generator' className={props.className}>
            <Header url={url}  linkUser={linkUser}  back={"rgba(9, 1, 14, 1)"}/>
            <div id='circle1'></div>
            <div id='circle2'></div>
            <div id='circle3'></div>
            <div className='body'>
            </div>
            
        </div>
    )
}

export default Generator;