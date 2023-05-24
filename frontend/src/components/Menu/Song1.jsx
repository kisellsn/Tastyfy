import React from 'react';
import './Menu.scss';
// import img from '../../images/imageNotFound.png'

const Song1 = ({song}) => {
    let artist = song.artist.length > 24 ? song.artist.substring(0, 24) + "..." : song.artist;

    return (
        <div className="song-card" id={song.id}>
            <div className="song-card_img" id={song.id}>
                <img src={song.image} alt="Default song"/>
            </div>
            <div className="song-card_content">
                <h4 className="song-card_artist">{artist}</h4>
            </div>
        </div>
    )
};

export default Song1;