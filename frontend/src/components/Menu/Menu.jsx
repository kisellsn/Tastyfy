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
import { getRecommendations, getRecs, getToken, getTops, registerSpotify } from 'src/util/functions';
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
  const countries = [ 'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde', 'Chad', 'Comoros', `Côte d'Ivoire`, 'Democratic Republic of the Congo', 'Djibouti', 'Egypt', 'Ethiopia', 'Equatorial Guinea', 'Eswatini', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Republic of the Congo', 'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Seychelles', 'Sierra Leone', 'South Africa', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe', 'Asia', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei Darussalam', 'Cambodia', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kuwait', 'Kyrgyzstan', 'Lao People\'s Democratic Republic', 'Lebanon', 'Macao', 'Malaysia', 'Maldives', 'Mongolia', 'Nepal', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Europe', 'Åland', 'Albania', 'Andorra', 'Anguilla', 'Ascension', 'Austria', 'Azores', 'Balearic Islands', 'Belarus', 'Belgium', 'Bermuda', 'Bosnia', 'British Virgin Islands', 'Bulgaria', 'Canary Islands', 'Cayman Islands', 'Ceuta', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Falkland Islands', 'Faroe Islands', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Germany', 'Gibraltar', 'Greece', 'Greenland', 'Guadeloupe', 'Guernsey', 'Hungary', 'Iceland', 'Ireland', 'Isle of Man', 'Italy', 'Jersey', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madeira', 'Malta', 'Martinique', 'Mayotte', 'Melilla', 'Moldova', 'Monaco', 'Montenegro', 'Montserrat', 'Netherlands', 'New Caledonia', 'North Macedonia', 'Norway', 'Pitcairn Islands', 'Poland', 'Portugal', 'Romania', 'Réunion', 'Saint Barthélemy', 'Saint Helena', 'Saint Martin', 'Saint Pierre and Miquelon', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Svalbard', 'Sweden', 'Switzerland', 'Tristan da Cunha', 'Turkey', 'Turks and Caicos Islands', 'Ukraine', 'United Kingdom', 'Wallis and Futuna', 'North America', 'American Samoa', 'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Curaçao', 'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guam', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Northern Mariana Islands', 'Panama', 'Puerto Rico', 'St. Kitts and Nevis', 'St. Lucia', 'St. Vincent and the Grenadines', 'Trinidad and Tobago', 'United States', 'United States Minor Outlying Islands (Navassa Island, Baker Island, Howland Island, Jarvis Island, Johnston Atoll, Kingman Reef, Midway Atoll, Wake Atoll)', 'United States Virgin Islands', 'South America', 'Argentina', 'Aruba', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Sint Maarten', 'Suriname', 'Uruguay', 'Venezuela', 'Oceania', 'Australia', 'Bonaire', 'Christmas Island', 'Cocos (Keeling) Islands', 'Cook Islands', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Niue', 'Norfolk Island', 'Palau', 'Papua New Guinea', 'Saba', 'Samoa', 'Sint Eustatius', 'Solomon Islands', 'Tokelau', 'Tonga', 'Tuvalu', 'Vanuatu' ]; // You can now use the `countries` array in your code as needed.
  const options = useMemo(() => {
    const countryOptions = countryList().getData();
    const filteredOptions = countryOptions.filter(option => countries.includes(option.label));
    const globalOption = { label: 'Global' };
    return [globalOption, ...filteredOptions];
  }, []);

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

  useEffect(() => {
    const fetchRecSongs = async () => {
      try {
        const recommendations = await getRecs();
        setRec(recommendations);
        setValue('Global')
      } catch (error) {
        console.error('Error fetching rec songs:', error);
        // Handle the error
      }
    };
  
    fetchRecSongs();
  }, []);
  let url = ''
  if (userInfo.images) url=userInfo.images[0].url
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
          <img id='avatar' src={url || avatar} loading="lazy" alt={'Avatar'}/>
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
