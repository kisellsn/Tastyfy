import React from 'react';
import './Menu.scss';
import LinkI from 'src/assets/images/link.png'

const Song2 = ({song}) => {
    let artist = song.artists[0].name
    let title = song.name.length > 23 ? song.name.substring(0, 23) + "..." : song.name;

    const spotifySong = () => {
        const url = song.external_urls.spotify;
        window.location.href = url;
      };
    return (
        <div className="rec-card" id={song.id}>
            <div className="rec-card_img" id={song.id}>
                <img src={song.album.images[0].url} alt="Default song"/>
            </div>
            <div className="rec-card_content">
                <h4 className="rec-card_text1">{title}</h4>
                <h4 className="rec-card_text2">{artist}</h4>
            </div>
            <div className="rec-card_plus">
                <img className='plus' src={LinkI} alt="Default song" onClick={spotifySong}/>
            </div>
        </div>
    )
};

export default Song2;