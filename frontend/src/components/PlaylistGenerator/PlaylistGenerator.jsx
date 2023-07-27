import React, { useEffect, useState } from 'react';
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import { getToken, registerSpotify } from 'src/util/functions';
import Header from '../Header/Header';

function PlaylistGenerator(props) {
    const [userInfo, setUserInfo] = useState('');
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
      if (userName) return;
      getToken().then(token => {
        if (!token.Authorization) navigate('/');
      })
      registerSpotify().then(user => {
        if (!user) navigate('/');
        setUserInfo(user);
        setUserName(user.display_name);
      });
    })

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
                <h3>Your playlist will be generated...</h3>
                <div className='playlistContainer'>
                    <div className='searching'>
                        {/* <h1>SEARCH</h1> */}
                        <form onSubmit={(e) => e.preventDefault()}>
                            <svg height="55%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_752_44)">
                                <path d="M16.8 28.8002C23.8692 28.8002 29.6 23.0694 29.6 16.0002C29.6 8.93095 23.8692 3.2002 16.8 3.2002C9.73075 3.2002 4 8.93095 4 16.0002C4 23.0694 9.73075 28.8002 16.8 28.8002Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                                <path d="M25.7832 25.7832L36.4 36.4" stroke="white" strokeWidth="4" strokeMiterlimit="10"/>
                                </g>
                            </svg>
                            <input 
                            type="text" 
                            name="text" 
                            autocomplete="off"
                            // value={text} 
                            // placeholder="ПОШУК"
                            // onChange={updateFilterValue}
                            />
                            <svg height="55%" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M8.75 8.75L31.25 31.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.75 31.25L31.25 8.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </form>
                    </div>
                    <div className='searchSong'>
                        <div className='songList flex-two'>
                            dfdf
                        </div>
                        <div className='songList flex-one'>
                            dfdfd
                        </div>
                    </div>
                    <div className='done'>
                        <button>Done</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default PlaylistGenerator;