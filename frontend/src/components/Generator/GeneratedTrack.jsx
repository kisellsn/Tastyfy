import React from 'react';
import './styles.scss';
import img from '../../assets/images/NOimage.png'

const GeneratedTrack = ({song, removeTrack}) => {
    let title = song.name.length > 23 ? song.name.substring(0, 23) + "..." : song.name;
    let artist = song.album?.artists[0]?.name.length > 22 ? song.album?.artists[0]?.name.substring(0, 22) + "..." : song.album?.artists[0]?.name;
    const removeSong = () => {
        removeTrack(song.id)
    }

    return (
        <div className="gPlaylist-card">
            <div className="gPlaylist-card_img" id={song.id}>
                <a href={song.external_urls.spotify}> 
                    <img src={song.album?.images[0]?.url || img} alt="Default song"/>
                </a>
            </div>
            <div className="gPlaylist-card_content">
                <h4>{title}</h4>
                <h4>{artist}</h4>
            </div>
            <div className="gPlaylist-card_remove">
                <svg 
                    width="100%" 
                    height="100%"
                    viewBox="0 0 40 40" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={removeSong}>
                    <path d="M8.75 8.75L31.25 31.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.75 31.25L31.25 8.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.75 8.75L31.25 31.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8.75 31.25L31.25 8.75" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
};

export default GeneratedTrack;