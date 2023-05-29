import React from 'react';
import './Menu.scss';
// import img from '../../images/imageNotFound.png'

const Song1 = ({song}) => {
    let artist = song.track.artists[0].name;
    let album = song.track.album.images[0].url;

    return (
        <div className="song-card">
            <div className="song-card_img">
                <img src={album} alt="Default song"/>
            </div>
            <div className="song-card_content">
                <h4 className="song-card_artist">{artist}</h4>
            </div>
        </div>
    )
};

export default Song1;