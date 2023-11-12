import React from 'react';
import './styles.scss';
import img from '../../assets/images/NOimage.png'

const ListSong = ({song, addToPlaylist}) => {
    // console.log(song);
    let title = song.name.length > 23 ? song.name.substring(0, 23) + "..." : song.name;
    let artist = song.album?.artists[0]?.name.length > 20 ? song.album?.artists[0]?.name.substring(0, 20) + "..." : song.album?.artists[0]?.name;
    let album = song.album.name.length > 25 ? song.album.name.substring(0, 25) + "..." : song.album.name;

    const handleChoice = () => {
        addToPlaylist(song.id, song)
    }
    return (
        <div className="list-card">
            <div className="list-card_img" id={song.id}>
                <a href={song.external_urls.spotify}> 
                    <img src={song.album?.images[0]?.url || img} alt="Default song"/>
                </a>
            </div>
            <div className="list-card_content">
                <h4>{title}</h4>
                <h4>{artist}</h4>
                <h4>{album}</h4>
            </div>
            <div className="list-card_plus">
                <svg 
                    width="100%" 
                    height="100%" 
                    viewBox="0 0 45 45" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={handleChoice}>
                    <path d="M22.5 9.84375V35.1562" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.84375 22.5H35.1562" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
        </div>
    )
};

export default ListSong;