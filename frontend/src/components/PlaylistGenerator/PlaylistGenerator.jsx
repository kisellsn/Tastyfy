import React, { useEffect, useState } from 'react';
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import {getUserFromStorage } from 'src/util/local';
import { playlistSongs } from 'src/util/functions';
import ListSong from './ListSong';
import { usePlaylistContext } from 'src/context/playlistContext';
import PlaylistSong from './PlaylistSong';

function PlaylistGenerator(props) {
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        const checkAuthorization = () => {
            const user = getUserFromStorage();
            setUserInfo(user);
        };
    
        checkAuthorization(); 
        
      }, [navigate]);

    let url = ''
    if (userInfo.images) url=userInfo.images[0].url
  
    const linkUser = () => {
      const url = userInfo.external_urls.spotify;
      window.location.href = url;
    };

    const [inputValue, setInputValue] = useState('');
    const [listSongs, setListSongs] = useState('');
    const {addToPlaylist, removeItem, playlist} = usePlaylistContext();
    const [flag, setFlag] = useState(0);

    const handleClearInput = () => {
      setInputValue(''); 
      setListSongs('')
    };
    const handleSearch = async() => {
        try {
            setFlag(1);
            const options = await playlistSongs(inputValue);
            setListSongs(options);
            setFlag(0);
        } catch (error) {
            console.error("Error fetching playlist songs:", error);
        }
    };

    const handleGeneration = () => {
        navigate('/generator');
    }



    return (
        <div id='generator' className={props.className}>
            <Header url={url}  linkUser={linkUser}  back={"rgba(9, 1, 14, 1)"}/>
            <div id='circle1'></div>
            <div id='circle2'></div>
            <div id='circle3'></div>
            <div className='body'>
                <div>
                    <h3>Your playlist will be generated...</h3>
                </div>
                <div className='playlistContainer'>
                    <div className='searching'>
                        {/* <h1>SEARCH</h1> */}
                        <form onSubmit={(e) => 
                        {
                        e.preventDefault();
                        if (inputValue) {
                            handleSearch();
                        }}}>
                            <svg 
                                height="55%" 
                                viewBox="0 0 40 40" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={inputValue ? handleSearch : null}
                                className={inputValue ? '' : 'inactive-svg'}>
                                <g clipPath="url(#clip0_752_44)">
                                <path d="M16.8 28.8002C23.8692 28.8002 29.6 23.0694 29.6 16.0002C29.6 8.93095 23.8692 3.2002 16.8 3.2002C9.73075 3.2002 4 8.93095 4 16.0002C4 23.0694 9.73075 28.8002 16.8 28.8002Z" stroke="white" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                                <path d="M25.7832 25.7832L36.4 36.4" stroke="white" strokeWidth="4" strokeMiterlimit="10"/>
                                </g>
                            </svg>
                            <input 
                            type="text" 
                            name="text" 
                            autoComplete="off"
                            placeholder='Enter the name of the song'
                            value={inputValue}
                            onSubmit={inputValue ? handleClearInput : null}
                            onChange={(e) => setInputValue(e.target.value)}
                            />
                            <svg 
                                height="55%" 
                                viewBox="0 0 40 40" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                onClick={inputValue ? handleClearInput : null}
                                className={inputValue ? '' : 'inactive-svg'}>
                                <path d="M8.75 8.75L31.25 31.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                <path d="M8.75 31.25L31.25 8.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </form>
                        
                        <div className='iconInfo'>
                            <span className="tooltiptext">Tooltip text</span>
                            <svg width="100%" height="100%" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M21.5002 3.58301C11.6263 3.58301 3.5835 11.6258 3.5835 21.4997C3.5835 31.3735 11.6263 39.4163 21.5002 39.4163C31.374 39.4163 39.4168 31.3735 39.4168 21.4997C39.4168 11.6258 31.374 3.58301 21.5002 3.58301ZM21.5002 7.16634C29.4375 7.16634 35.8335 13.5624 35.8335 21.4997C35.8335 29.437 29.4375 35.833 21.5002 35.833C13.5629 35.833 7.16683 29.437 7.16683 21.4997C7.16683 13.5624 13.5629 7.16634 21.5002 7.16634Z" fill="white"/>
                                <path d="M21.5002 16.125C21.025 16.125 20.5693 16.3138 20.2333 16.6498C19.8973 16.9858 19.7085 17.4415 19.7085 17.9167V30.4583C19.7085 30.9335 19.8973 31.3892 20.2333 31.7252C20.5693 32.0612 21.025 32.25 21.5002 32.25C21.9753 32.25 22.4311 32.0612 22.7671 31.7252C23.1031 31.3892 23.2918 30.9335 23.2918 30.4583V17.9167C23.2918 17.4415 23.1031 16.9858 22.7671 16.6498C22.4311 16.3138 21.9753 16.125 21.5002 16.125Z" fill="white"/>
                                <path d="M23.2918 12.5407C23.2918 13.0159 23.1031 13.4716 22.7671 13.8076C22.4311 14.1436 21.9753 14.3324 21.5002 14.3324C21.025 14.3324 20.5693 14.1436 20.2333 13.8076C19.8973 13.4716 19.7085 13.0159 19.7085 12.5407C19.7085 12.0655 19.8973 11.6098 20.2333 11.2738C20.5693 10.9378 21.025 10.749 21.5002 10.749C21.9753 10.749 22.4311 10.9378 22.7671 11.2738C23.1031 11.6098 23.2918 12.0655 23.2918 12.5407Z" fill="white"/>
                            </svg>
                        </div>
                    </div>
                    <div className='searchSong'>
                        <div className='songList flex-two'>
                            <div className='scrollList'>
                            {flag === 0 ? (
                                <>
                                    {listSongs !== '' ? (
                                        <>
                                        {listSongs.map((song, index) => (
                                            <ListSong key={index} song={song} addToPlaylist={addToPlaylist}/>
                                        ))}
                                        </>
                                    ):(
                                        <p></p>
                                    )}
                                </>
                                ):(
                                    <p>Loading data...</p>
                                )
                            }
                            </div>
                        </div>
                        <div className='songList flex-one'>
                            <div className='scrollList'>
                                {playlist !== [] ? (
                                    <>
                                    {playlist.map((song, index) => (
                                        <PlaylistSong key={index} song={song.song} removeItem={removeItem}/>
                                    ))}
                                    </>
                                ):(
                                    <p></p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='done'>
                        <button className={playlist.length  ? '' : 'unactive_button'} onClick={playlist.length  ? handleGeneration : null}>Done</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default PlaylistGenerator;