import React from 'react';
import './Menu.scss';
import AddImage from 'src/assets/images/menu/menu_add.png';
// import img from '../../images/imageNotFound.png'

const Song2 = ({song}) => {
    let artist = song.artist.length > 24 ? song.artist.substring(0, 24) + "..." : song.artist;
    let title = song.title.length > 24 ? song.title.substring(0, 24) + "..." : song.title;
    return (
        <div className="rec-card" id={song.id}>
            <div className="rec-card_img" id={song.id}>
                {/* <img src={song.image} alt="Default song"/> */}
            </div>
            <div className="rec-card_content">
                <h4 className="rec-card_text">{title}</h4>
                <h4 className="rec-card_text">{artist}</h4>
            </div>
            <div className="rec-card_plus">
                {/* <img src={song.image} alt="+"/> */}
                <img className='plus' src={AddImage} alt="Default song"/>

            </div>
        </div>
    )
};

export default Song2;