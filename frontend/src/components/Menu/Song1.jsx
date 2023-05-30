import React from 'react';
import './Menu.scss';
// import img from '../../images/imageNotFound.png'

const Song1 = ({song}) => {
    let artist = song.name;
    let album = song.images[0].url;
    const artistUser = () => {
        const url = song.external_urls.spotify;
        window.location.href = url;
      };

    return (
        <div className="song-card">
            <div className="song-card_img">
                <img src={album} alt="Default song" onClick={artistUser}/>
            </div>
            <div className="song-card_content">
                <h4 className="song-card_artist">{artist}</h4>
            </div>
        </div>
    )
};

export default Song1;