import { React, useEffect, useMemo, useState } from 'react';
import avatar from '../../assets/images/menu/avatar.png'
import VectorImage from 'src/assets/images/menu/menu_Vector.png';
import './Menu.scss';
// import Sircle from 'src/assets/images/menu/sircle.png';
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


  const [value, setValue] = useState('')
  const [rec, setRec] = useState([])
  const [topSong, setTopSong] = useState([])
  const options = useMemo(() => countryList().getData(), [])

  const changeHandler = async(value) => {
    try {
      const recommendations = await getRecommendations(value.value);
      setRec(recommendations);
      setValue(value);
    } catch (error) {
      console.error('Error fetching rec songs:', error);
    }
  }

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
        const tops = await getTops();
        setTopSong(tops);
      } catch (error) {
        console.error('Error fetching top songs:', error);
        // Handle the error
      }
    };
  
    fetchTopSongs();
  }, []);

  console.log(topSong.top)
  return (
    <div id='analytics' className={props.className}>
      <div id='header'>
        <div id='headTastyfy'>Tastyfy</div>
          <div id='menu'>
            <div className='menuItem'>Analytics</div>
            <div className='menuItem PG'>Playlist Generator</div>
          </div>
          {/* {if user.images */}
          {/* {userInfo.images ? (): */}
          {/* // <img id='avatar' src={userInfo.images[0].url} loading="lazy" alt={'Avatar'}/> */}
          <img id='avatar' src={avatar} loading="lazy" alt={'Avatar'} />
          {/* // } */}
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
            <div className={`song_content center`} >
              {
                topSong?.length === 0 ?
                    <p className='no_song'>
                        Not enough data
                    </p>
                :
                topSong?.map((song, index) => (
                        <Song1 key={index} song={song} />
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
            {rec instanceof Promise ? (
              <p>Loading recommendations...</p>
            ) : rec.length === 0 ? (
              <p className='no_song'>No recommendations available</p>
            ) : (
              rec.map((song, index) => <Song2 key={index} song={song} />)
            )}
            </div>
          </div>
          </div>
        </div>
      </div>
  );
}

export default Menu;
