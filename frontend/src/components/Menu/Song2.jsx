import React from 'react';
import './Menu.scss';
// import AddImage from 'src/assets/images/menu/menu_add.png';
// import img from '../../images/imageNotFound.png'

const Song2 = ({song}) => {
    let artist = song.artists[0].name;
    let title = song.name;
    return (
        <div className="rec-card" id={song.id}>
            <div className="rec-card_img" id={song.id}>
                <img src={song.album.images[0].url} alt="Default song"/>
            </div>
            <div className="rec-card_content">
                <h4 className="rec-card_text1">{title}</h4>
                <h4 className="rec-card_text2">{artist}</h4>
            </div>
            {/* <div className="rec-card_plus">
                <img className='plus' src={AddImage} alt="Default song"/>
            </div> */}
        </div>
    )
};

export default Song2;