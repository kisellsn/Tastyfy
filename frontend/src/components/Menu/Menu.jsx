import { React, useEffect, useMemo, useState } from 'react';
import avatar from '../../assets/images/menu/avatar.png'
import VectorImage from 'src/assets/images/menu/menu_Vector.png';
import './Menu.scss';
import Sircle from 'src/assets/images/menu/sircle.png';
import Song1 from './Song1';
import Song2 from './Song2';
import countryList from 'react-select-country-list';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { getRecommendations, getToken, getTops, registerSpotify } from 'src/util/functions';
import PlotComponent from '../PlotComponent/PlotComponent';

function Menu(props) {
  const [userInfo, setUserInfo] = useState('');
  const [userName, setUserName] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (userName) return;
    getToken().then(token => {
      if (!token.Authorization) navigate('/');
    })
    registerSpotify().then(user => {
      if (!user) navigate('/');
      setUserInfo(user);
      setUserName(user.display_name);
    });
  })


  // let songs = [{id:'1',artist: 'Hector'},{id:'2',artist: 'Anya'},{id:'3',artist: 'Masha'},{id:'4',artist: 'IcE'},{id:'5',artist: 'IcE'},{id:'5',artist: 'IcE'}];
  // let recSongs = [{id:'1',artist: 'Hector',title:'FFF'}, {id:'2',artist: 'Hector',title:'FFF'},{id:'1',artist: 'Hector',title:'FFF'},{id:'1',artist: 'Hector',title:'FFF'},{id:'1',artist: 'Hector',title:'FFF'},{id:'1',artist: 'Hector',title:'FFF'}];
  let songs = []
  let recSongs = []

  const [value, setValue] = useState('')
  const [rec, setRec] = useState([])
  const [topSong, setTopSong] = useState([])
  const options = useMemo(() => countryList().getData(), [])
  // let country = ''
  const changeHandler = value => {
    console.log('I need country code, ', value.value)
    const recommandations = getRecommendations(value.value);
    setRec(recommandations);
    setValue(value);
    recSongs = rec;
  }

  useEffect(() => {
    setTopSong(getTops())
    songs = topSong;
  }, []);


  return (
    <div id='analytics' className={props.className}>
      <div id='header'>
        <div id='headTastyfy'>Tastyfy</div>
          <div id='menu'>
            <div className='menuItem'>Analytics</div>
            <div className='menuItem PG'>Playlist Generator</div>
          </div>
          <img id='avatar' src={avatar} loading="lazy" alt={'Avatar'} />
      </div>
      <div id='analyze'>
        <div className='musicContainer'>
          <div id='titleA'><h4>Your music results</h4></div>
          <div id='info'>
            <div id='textInfo' className='textBlock'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </div>
            <div id='graffic' className='textBlock'>
              <img id='stat'src={VectorImage} loading="lazy" alt={'Vector'} />
              data
            </div>
          </div>
        </div>
        <div className='topContainer'>
          <div id='titleA'><h4>Current Top Artist</h4></div>
          <div id='info'>
            <div id='grafficA'>
              {/* <img id='sircle'src={Sircle} loading="lazy" alt={'Vector'} /> */}
              <PlotComponent />
            </div>
            <div className={`song_content ${songs?.length === 0  ? 'center' : ''}`} >
              {
                songs?.length === 0 ?
                    <p className='no_song'>
                        Not found
                    </p>
                :
                songs?.map(song => (
                        <Song1 key={song.id} song={song} />
              ))}
            </div>
          </div>
        </div>
        <div className='recommendationContainer'>
          <div id='titleA'><h4>Recommendations from selected region</h4></div>
          <div id='listing'>
            <div className='countries' >
              {/* <div className='selecting'>Select country</div>
              <img className='options' src={Options} alt="+" /> */}
              <Select options={options} value={value} onChange={changeHandler} 
              placeholder="Select country"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(58, 29, 78, 1)',
                  color: 'white',
                  border: 'none',
                  boxShadow: 'none',
                  fontFamily: 'Lexend',
                  fontSize: '22px',
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white',
                }),
                indicatorSeparator: () => null,
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: 'white',
                  '&:hover': {
                    color: 'white',
                  },
                }),
                option: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(58, 29, 78, 1)',
                  color: 'white', 
                  '&:hover': {
                    color: 'grey',
                  },
                }),
                placeholder: (provided)=> ({
                  ...provided,
                  color: 'white', 
                }),
              }}
            />
              </div>
          </div>
          <div id='recomendation'>
            <div className='rec_content'>
                {
                  recSongs?.length === 0 ?
                      <p className='no_song'>
                          Not found
                      </p>
                  :
                  recSongs?.map(song => (
                          <Song2 key={song.id} song={song} />
                ))}
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}

export default Menu;
