/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import '../PlaylistGenerator/styles.scss'
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { usePlaylistContext } from 'src/context/playlistContext';
import GeneratedTrack from './GeneratedTrack';
import { addImage, addToPlaylist, createPlaylist, generateTracks } from 'src/util/functions';
import { useNewtracksContext } from 'src/context/newtracksContext';
import { getUserFromStorage } from 'src/util/local';
import SpotifyLogoWhite from 'src/assets/images/Spotify_Logo_RGB_White.png';


function Generator(props) {
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();
    const {playlist, clearPlaylist} = usePlaylistContext();
    const {tracks, removeTrack, generateItems, clearTracks, playlist2} = useNewtracksContext();


    useEffect(() => {
        const checkPlaylist = () => {
            if(!playlist || !playlist.length)navigate('/playlists');
        }
        checkPlaylist(); 
        setUserInfo(getUserFromStorage())
      }, [navigate, playlist]);

    let url = ''
    if (userInfo.images) url=userInfo.images[0].url
  
    const linkUser = () => {
      const url = userInfo.external_urls.spotify;
      window.location.href = url;
    };
    const [flag, setFlag] = useState(0);

    useEffect(() => {
        const fetchTracks = async() =>{
            try {
                setFlag(1);
                let options;
                const arrayOfObjects = playlist.map((item) => item.song);
                if((playlist !== playlist2) || tracks.length ===0){
                    options = await generateTracks(arrayOfObjects);
                } else {
                    options = tracks.map((item) => item.song);
                }
                if(playlist && options)generateItems(playlist, options)
                setFlag(0);
            } catch (error) {
                console.error("Error fetching playlist songs:", error);
            }
        }

            fetchTracks();


      }, [playlist]);


    const [inputName, setInputName] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputFile, setInputFile] = useState('');
    const [playlistId, setPlaylistId] = useState('')
   

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setInputFile(file);
      };
    const handleBack = () =>{
        navigate('/playlists')
    }

    const showModal = (modalId) => {
        let modal = document.getElementById(modalId);
        modal.style.display = 'block';
      }
      
    const hideModal = (modalId) => {
        let modal = document.getElementById(modalId);
        modal.style.display = 'none';
      }
    const addingItems = async() => {
        try {
            const response = addToPlaylist(playlistId, tracks.map((item) => item.song))
            if(response && inputFile){
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    addImage(base64String, playlistId);
                };
                reader.readAsDataURL(inputFile);
            }
            hideModal('custom-modal')
            showModal('custom-modal2')
        } catch(error) {
            console.error("Error fetching playlist songs:", error);
        }
    }

    const handleCreate = async() => {
        try {
            const data = await createPlaylist(inputName, inputDescription, userInfo.id);
            const id = data.playlist_id;
            setPlaylistId(id)
            const exist = data.is_exists;
            if (exist){
                showModal('custom-modal');
                return;
            }
            addToPlaylist(id, tracks.map((item) => item.song))
            if(inputFile){
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    addImage(base64String, id);
                };
                reader.readAsDataURL(inputFile);
            }
            showModal('custom-modal2')
        } catch (error) {
            console.error("Error fetching playlist songs:", error);
        }
    }

    const closeGenerator = () =>{
        clearPlaylist();
        clearTracks();
        navigate('/menu')
    }

    const regeneratePlaylist = () =>{
        clearTracks();
        hideModal('custom-modal2')
        const fetchTracks = async() =>{
            try {
                setFlag(1);
                let options;
                const arrayOfObjects = playlist.map((item) => item.song);
                if((playlist !== playlist2) || tracks.length ===0){
                    options = await generateTracks(arrayOfObjects);
                } else {
                    options = tracks.map((item) => item.song);
                }
                if(playlist && options)generateItems(playlist, options)
                setFlag(0);
            } catch (error) {
                console.error("Error fetching playlist songs:", error);
            }
        }

        fetchTracks();
    }

    return (
        <div id='generator' className={props.className}>
            <Header url={url}  linkUser={linkUser}  back={"rgba(9, 1, 14, 1)"}/>
            <div className='circleMenu' style={{backgroundColor:`rgba(8, 99, 99, 1)`}}></div>
            <div id='circle1'></div>
            <div id='circle2'></div>
            <div id='circle3'></div>
            <div id="custom-modal" className="modal">
                <div className="modal-content" style={{background: ' linear-gradient(100deg, rgb(19, 132, 117) 20%, rgb(43, 13, 108) 75%)'}}>
                    <span className="close-btn" onClick={() => hideModal('custom-modal')}>
                        <svg width="100%" height="100%" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L17.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 17.5L17.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <p id="modal-text">You've already got a playlist with such a name! Do you want the generated songs added to it?</p>
                    <div className='modal-buttons'>
                        <button onClick={addingItems}>Add to Playlist</button>
                        <button onClick={() => hideModal('custom-modal')}>No</button>
                    </div>
                </div>
            </div>
            <div id="custom-modal2" className="modal">
                <div className="modal-content" style={{background: ' linear-gradient(-135deg, rgba(35, 168, 14, 0.64) 0%, rgba(121, 32, 176, 1) 100%)'}}>
                    <span className="close-btn" onClick={() => hideModal('custom-modal2')}>
                        <svg width="100%" height="100%" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1 1L17.5 17.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M1 17.5L17.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <p id="modal-text" className='center'>Playlist created!<br/>Return to the analytics page or create another playlist?</p>
                    <div className='modal-buttons'>
                        <button onClick={closeGenerator}>Back</button>
                        <button className='mainButton' onClick={regeneratePlaylist}>Create</button>
                    </div>
                </div>
            </div>
            <div className='body'>
                <div className='generatorContainer'>
                    <div className='playlistData'>
                        <label className='data_img'>
                            {inputFile ? (
                                <img src={URL.createObjectURL(inputFile)} alt="Uploaded" />
                            ) : (
                                <svg width="45%" height="45%" viewBox="0 0 96 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clipPath="url(#clip0_709_49)">
                                    <path d="M14.229 6.70787C12.798 5.97419 12 6.58425 12 8.06237V77.9374C12 79.4155 12.798 80.0229 14.229 79.2919L82.332 44.3329C83.766 43.5992 83.859 42.4006 82.425 41.6669L14.229 6.70787Z" stroke="#605759" strokeOpacity="0.55" strokeWidth="2" strokeMiterlimit="10"/>
                                    <path d="M91.3848 75.481H67.3848" stroke="#605759" strokeOpacity="0.55" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                                    <path d="M79.3848 64.731V86.231" stroke="#605759" strokeOpacity="0.55" strokeWidth="2" strokeMiterlimit="10" strokeLinecap="round"/>
                                    </g>
                                    <defs>
                                    <clipPath id="clip0_709_49">
                                    <rect width="96" height="86" fill="white"/>
                                    </clipPath>
                                    </defs>
                                </svg>
                            )}
                            <input
                                type="file"
                                id="upload-input"
                                style={{ display: 'none' }}
                                onChange={handleFileUpload}
                                accept="image/*"
                            />
                        </label>
                        <div className='data_name'>                        
                            <form onSubmit={(e) => e.preventDefault()}>
                                <input 
                                type="text" 
                                name="text" 
                                autoComplete="off"
                                value={inputName}
                                placeholder='Name'
                                onChange={(e) => setInputName(e.target.value)}
                                />
                            </form>
                        </div>
                        <div className='data_description'>
                            <form onSubmit={(e) => e.preventDefault()}>
                                    <textarea 
                                    type="text" 
                                    name="text" 
                                    autoComplete="off"
                                    value={inputDescription}
                                    placeholder='Description'
                                    onChange={(e) => setInputDescription(e.target.value)}
                                    />
                                </form>
                        </div>
                    </div>
                    <div className='boxPlaylist'>
                        <p className='hiddenMobile' >Your songs</p>
                    </div>
                    <div className='generatedTracks'>

                        <div className='scrollList'>
                                {flag === 0 ? (
                                    <>
                                        {tracks ? (
                                            <>
                                            {tracks.map((song, index) => (
                                                <GeneratedTrack key={index} song={song.song} removeTrack={removeTrack}/>
                                            ))}
                                            </>
                                        ):(
                                            <p>We don`t have you songs.</p>
                                        )}
                                    </>
                                    ):(
                                        <div className='pussyCat1'>
                                            <p>Loading data...</p>
                                        </div>
                                    )
                                }
                         </div>
                    </div>
                </div>
                <div className='buttons'>
                    <div className='buttonCreate'>
                        <button className={(inputName && tracks.length) ? '' : 'unactive_button'} onClick={(inputName && tracks.length) ? handleCreate : null}>Create</button>
                    </div>
                    <div className='buttonCreate'>
                        <button onClick={handleBack}>Back</button>
                    </div>
                </div>
                <div className='power'>
                    <div>Powered by</div>
                    <a href="https://spotify.com">
                        <img 
                            src={SpotifyLogoWhite} 
                            alt='Spotify'
                            loading="lazy"
                        />
                    </a>
                </div>
            </div>
            
        </div>
    )
}

export default Generator;