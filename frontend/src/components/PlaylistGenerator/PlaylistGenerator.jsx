import React, { useEffect, useRef, useState } from 'react';
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { clearLocalStorage, getUserFromStorage, storeUser } from 'src/util/local';
import { playlistSongs } from 'src/util/functions';
import ListSong from './ListSong';
import { usePlaylistContext } from 'src/context/playlistContext';
import PlaylistSong from './PlaylistSong';

function PlaylistGenerator(props) {
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();
    const startRef = useRef(Date.now());
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
      setInputValue(''); // Set the input's value to an empty string to clear it
      setListSongs('')
    };
    const handleSearch = async() => {
        try {
            setFlag(1);
            const options = await playlistSongs(inputValue);
            setListSongs(options);
            setFlag(0);
        } catch (error) {
            // Handle any errors that might occur during the Promise resolution
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
                <h3>Your playlist will be generated...</h3>
                <div className='playlistContainer'>
                    <div className='searching'>
                        {/* <h1>SEARCH</h1> */}
                        <form onSubmit={(e) => e.preventDefault()}>
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
                            value={inputValue}
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
                                        <p>Enter the name of the song.</p>
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
                                    <p>Add songs to playlist. (Maximum 5)</p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='done'>
                        <button className={playlist.length === 5 ? '' : 'unactive_button'} onClick={handleGeneration}>Done</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default PlaylistGenerator;