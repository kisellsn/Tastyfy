/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import '../PlaylistGenerator/styles.scss'
import './styles.scss'
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { clearLocalStorage, getUserFromStorage, storeUser } from 'src/util/local';
import { usePlaylistContext } from 'src/context/playlistContext';
import GeneratedTrack from './GeneratedTrack';
import { addImage, createPlaylist, generateTracks } from 'src/util/functions';
import { useNewtracksContext } from 'src/context/newtracksContext';


function Generator(props) {
    const [userInfo, setUserInfo] = useState('');
    const navigate = useNavigate();
    const startRef = useRef(Date.now());
    const {playlist} = usePlaylistContext();
    const {tracks, removeTrack, generateItems, clearPlaylist} = useNewtracksContext();


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
            if(!playlist || !playlist.length)navigate('/playlists');
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
    const [flag, setFlag] = useState(0);
    // const [newtracks, setNewtracks] = useState([]);

    useEffect(() => {
        const fetchTracks = async() =>{
            try {
                setFlag(1);
                const arrayOfObjects = playlist.map((item) => item.song);
                const options = await generateTracks(arrayOfObjects);
                if(playlist && options)generateItems(playlist, options)
                setFlag(0);
            } catch (error) {
                // Handle any errors that might occur during the Promise resolution
                console.error("Error fetching playlist songs:", error);
            }
        }

        fetchTracks();


      }, [playlist]);


    const [inputName, setInputName] = useState('');
    const [inputDescription, setInputDescription] = useState('');
    const [inputFile, setInputFile] = useState('');
   

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        setInputFile(file);
      };
    const handleBack = () =>{
        navigate('/playlists')
    }

    const handleCreate = async() => {
        try {
            const id = await createPlaylist(inputName, inputDescription, userInfo.id, tracks.map((item) => item.song));
            if(inputFile){
                const reader = new FileReader();
                reader.onloadend = () => {
                    const base64String = reader.result.split(',')[1];
                    addImage(base64String, id);
                };
                reader.readAsDataURL(inputFile);
            }
            clearPlaylist();
            navigate('/playlists')
        } catch (error) {
            console.error("Error fetching playlist songs:", error);
        }
    }

    return (
        <div id='generator' className={props.className}>
            <Header url={url}  linkUser={linkUser}  back={"rgba(9, 1, 14, 1)"}/>
            <div id='circle1'></div>
            <div id='circle2'></div>
            <div id='circle3'></div>
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
                                    <p>Loading data...</p>
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className='buttons'>
                    <div className='buttonCreate'>
                        <button className={(inputName && tracks.length) ? '' : 'unactive_button'} onClick={handleCreate}>Create</button>
                    </div>
                    <div className='buttonCreate'>
                        <button className={tracks.length ? '' : 'unactive_button'} onClick={handleBack}>Back</button>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Generator;