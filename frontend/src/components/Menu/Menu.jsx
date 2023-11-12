import { React, useEffect, useMemo, useState } from 'react';
import './Menu.scss';
import styled from "styled-components";
import Song1 from './Song1';
import Song2 from './Song2';
import countryList from 'react-select-country-list';
import Select from 'react-select'
import { useNavigate } from 'react-router-dom';
import { featureDiagram, getRecommendations, getRecs, getText, getToken, getTops, postRecommendations, registerSpotify } from 'src/util/functions';
import PlotSircle from '../Plots/PlotSircle';
import PlotTop from '../Plots/PlotTop';
import PlotWeb from '../Plots/PlotWeb';
import FeatureViewer from '../Plots/FeatureViewer';
import Header from '../Header/Header';
import { clearLocalStorage, getTopsLocal, getUserFromStorage, newLocal, storeUser } from 'src/util/local';
import RecSelector from '../Plots/RecSlector';
import SpotifyLogoWhite from 'src/assets/images/Spotify_Logo_RGB_White.png';



function Menu(props) {
  const [userInfo, setUserInfo] = useState(getUserFromStorage());
  const navigate = useNavigate();
  useEffect(() => {
    if(getUserFromStorage()) return;
    getToken().then(token => {
      if (token !== 'new token was created') {
        clearLocalStorage()
        navigate('/');
      }
    })
    registerSpotify().then(user => {
        storeUser(user);
        setUserInfo(user);
    });
  })



  useEffect(() => {
    const checkAuthorization = () => {
      const user = getUserFromStorage();
      setUserInfo(user);

    };

    checkAuthorization(); 

  }, [navigate]);


  const [value, setValue] = useState('')
  const [rec, setRec] = useState([])
  const [topSong, setTopSong] = useState([])
  const [textMusic, setTextMusic] = useState('')
  const [features, setFeatures] = useState({})
  const [featuresPersent, setFeaturesPersent] = useState({})
  const [topTerm, setTopTerm] = useState('current')
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0)
  const [isHover, setIsHover] = useState('Hover')


  let countries = [ 'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde', 'Chad', 'Comoros', `Côte d'Ivoire`, 'Democratic Republic of the Congo', 'Djibouti', 'Egypt', 'Ethiopia', 'Equatorial Guinea', 'Eswatini', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Republic of the Congo', 'Rwanda', 'São Tomé and Príncipe', 'Senegal', 'Seychelles', 'Sierra Leone', 'South Africa', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe', 'Asia', 'Armenia', 'Azerbaijan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei Darussalam', 'Cambodia', 'Georgia', 'Hong Kong', 'India', 'Indonesia', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kuwait', 'Kyrgyzstan', 'Lao People\'s Democratic Republic', 'Lebanon', 'Macao', 'Malaysia', 'Maldives', 'Mongolia', 'Nepal', 'Oman', 'Pakistan', 'Palestine', 'Philippines', 'Qatar', 'Saudi Arabia', 'Singapore', 'South Korea', 'Sri Lanka', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Europe', 'Åland', 'Albania', 'Andorra', 'Anguilla', 'Ascension', 'Austria', 'Azores', 'Balearic Islands', 'Belarus', 'Belgium', 'Bermuda', 'Bosnia', 'British Virgin Islands', 'Bulgaria', 'Canary Islands', 'Cayman Islands', 'Ceuta', 'Croatia', 'Cyprus', 'Czech Republic', 'Denmark', 'Estonia', 'Falkland Islands', 'Faroe Islands', 'Finland', 'France', 'French Guiana', 'French Polynesia', 'Germany', 'Gibraltar', 'Greece', 'Greenland', 'Guadeloupe', 'Guernsey', 'Hungary', 'Iceland', 'Ireland', 'Isle of Man', 'Italy', 'Jersey', 'Kazakhstan', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Madeira', 'Malta', 'Martinique', 'Mayotte', 'Melilla', 'Moldova', 'Monaco', 'Montenegro', 'Montserrat', 'Netherlands', 'New Caledonia', 'North Macedonia', 'Norway', 'Pitcairn Islands', 'Poland', 'Portugal', 'Romania', 'Réunion', 'Saint Barthélemy', 'Saint Helena', 'Saint Martin', 'Saint Pierre and Miquelon', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Svalbard', 'Sweden', 'Switzerland', 'Tristan da Cunha', 'Turkey', 'Turks and Caicos Islands', 'Ukraine', 'United Kingdom', 'Wallis and Futuna', 'North America', 'American Samoa', 'Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Canada', 'Costa Rica', 'Curaçao', 'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guam', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Mexico', 'Nicaragua', 'Northern Mariana Islands', 'Panama', 'Puerto Rico', 'St. Kitts and Nevis', 'St. Lucia', 'St. Vincent and the Grenadines', 'Trinidad and Tobago', 'United States', 'United States Minor Outlying Islands (Navassa Island, Baker Island, Howland Island, Jarvis Island, Johnston Atoll, Kingman Reef, Midway Atoll, Wake Atoll)', 'United States Virgin Islands', 'South America', 'Argentina', 'Aruba', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Sint Maarten', 'Suriname', 'Uruguay', 'Venezuela', 'Oceania', 'Australia', 'Bonaire', 'Christmas Island', 'Cocos (Keeling) Islands', 'Cook Islands', 'Fiji', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Zealand', 'Niue', 'Norfolk Island', 'Palau', 'Papua New Guinea', 'Saba', 'Samoa', 'Sint Eustatius', 'Solomon Islands', 'Tokelau', 'Tonga', 'Tuvalu', 'Vanuatu' ];
  const options = useMemo(() => {
    const countryOptions = countryList().getData();
    const filteredOptions = countryOptions.filter(option => countries.includes(option.label));
    const globalOption = { label: 'Global' };
    return [globalOption, ...filteredOptions];
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const changeHandler = async(value) =>  {
    try {
      const countryCode = value.label;
      let recommendations;
      if (countryCode === 'Global') {
        recommendations = await getRecommendations();
      } else {
        recommendations = await postRecommendations(`${countryCode}_${value.value}`);
      }
      setRec(recommendations);
      setValue(value);
    } catch (error) {
      console.error('Error fetching rec songs:', error);
    }
  }

  useEffect(() => {
    const fetchTopSongs = async () => {
      try {
          let tops = getTopsLocal('tops');
          let topTermRef = getTopsLocal('topTerm');
          if (!tops || topTermRef !== topTerm){
            tops = await getTops(topTerm);
            newLocal('tops', tops)
            newLocal('topTerm', topTerm)
          }
          setTopSong(tops);

      } catch (error) {
        console.error('Error fetching top songs:', error);
      }
    };
  
    fetchTopSongs();
  }, [topTerm]);
  
  useEffect(() => {
    const fetchRecSongs = async () => {
      try {    
          let recommendations = getTopsLocal('recommendations');
          if (!recommendations){
            recommendations = await getRecs();
            newLocal('recommendations', recommendations)
          }
          setRec(recommendations);
          setValue('Global')
      } catch (error) {
        console.error('Error fetching rec songs:', error);
        // Handle the error
      }
    };
  
    fetchRecSongs();
  }, []);

  useEffect(() => {
    const fetchText = async () => {
      try {
        let text = getTopsLocal('text');
        if (!text){
          text = await getText();
          newLocal('text', text)
        }
        setTextMusic(text);
      } catch (error) {
        console.error('Error fetching text:', error);
        // Handle the error
      }
    };
  
    fetchText();
  }, []);

  useEffect(() => {
    async function fetchData() {
      try {
        let data = getTopsLocal('featureDiagram')
        if (!data){
          data = await featureDiagram();
          newLocal('featureDiagram', data)
        }
        setFeatures(data.best);
        setFeaturesPersent(data.features_dict);
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const isMobile = () => {
      const userAgent = navigator.userAgent;
      const mobileRegex = /Mobile|Tablet|iPad|iPhone|iPod|Android|Windows Phone|BlackBerry|Kindle|Silk|Opera Mini|Opera Mobi|PlayBook|Nintendo/i;
    
      return mobileRegex.test(userAgent);
    };
    const flag = isMobile()
    if(flag)setIsHover('Press')
    else setIsHover('Hover')

  }, []);
  let url = ''
  if (userInfo?.images) url=userInfo.images[0].url

  const linkUser = () => {
    const url = userInfo.external_urls.spotify;
    window.location.href = url;
  };

  const [containerCurrent, setContainerCurrent] = useState(0);
  const [circleColor, setCircleColor] = useState('rgba(8, 99, 99, 1)');
  const containersArray = [0,1,2,3];



  const handlePlusMate =() => {
    let newMate = containerCurrent+1
    if(newMate>3)newMate=newMate-4
    setContainerCurrent(newMate)
    if(newMate === 0)setCircleColor('rgba(8, 99, 99, 1)');
    if(newMate === 1)setCircleColor('rgba(108, 3, 97, 1)');
    if(newMate === 2)setCircleColor('rgba(22, 97, 47, 1)');
    if(newMate === 3)setCircleColor('rgba(49, 0, 130, 1)');
  }
  const handleMinusMate =() => {
    let newMate = containerCurrent-1
    if(newMate<0)newMate=newMate+4
    setContainerCurrent(newMate)
    if(newMate === 0)setCircleColor('rgba(8, 99, 99, 1)');
    if(newMate === 1)setCircleColor('rgba(108, 3, 97, 1)');
    if(newMate === 2)setCircleColor('rgba(22, 97, 47, 1)');
    if(newMate === 3)setCircleColor('rgba(49, 0, 130, 1)');
  }
  const darkScreen = () => {

  }
  return (
    <div id='analytics' className={props.className}>

      <Header url={url}  linkUser={linkUser} back={"rgb(26, 0, 36)"}/>
      <div className='circleMenu' style={{backgroundColor:`${circleColor}`}}></div>
      <div></div>
      <div id='analyze'>
        <div className={`hiddenArrowMenu ${containerCurrent === 3 ? 'hidden' : ''}`}>
          <svg onClick={handleMinusMate} width="100%" viewBox="0 0 88 91" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_15_86)" filter="url(#filter0_d_15_86)">
            <path d="M51.7 66.47L52.9933 64.5509L40.4917 46L52.9933 27.4491L51.7 25.53L37.905 46L51.7 66.47Z" fill="white"/>
            </g>
            <g filter="url(#filter1_f_15_86)">
            <circle cx="44" cy="46" r="9" transform="rotate(-180 44 46)" fill="#FFF8F8" fillOpacity="0.7"/>
            </g>
            <defs>
            <filter id="filter0_d_15_86" x="26" y="23" width="39" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_86"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_86" result="shape"/>
            </filter>
            <filter id="filter1_f_15_86" x="0" y="2" width="88" height="88" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="17.5" result="effect1_foregroundBlur_15_86"/>
            </filter>
            <clipPath id="clip0_15_86">
            <rect width="31" height="46" fill="white" transform="matrix(-1 0 0 -1 61 69)"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        <div className={`musicContainer ${containerCurrent !== 0 ? 'hidden' : ''}`}>
          <div id='titleA'><h4>Top Genres Spotlight</h4></div>
          <div id='info'>
            <div id='infoLeft'>
              <div id='textInfo' className='textBlock'>
                 {textMusic}
              </div>
            </div>
            <div id='infoRight'>
              <div className='iconInfo icon1' onClick={darkScreen}>
                    <span className="tooltiptext">{isHover} on the bar to show genre's listening count!</span>
                    <svg width="100%" height="100%" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M21.5002 3.58301C11.6263 3.58301 3.5835 11.6258 3.5835 21.4997C3.5835 31.3735 11.6263 39.4163 21.5002 39.4163C31.374 39.4163 39.4168 31.3735 39.4168 21.4997C39.4168 11.6258 31.374 3.58301 21.5002 3.58301ZM21.5002 7.16634C29.4375 7.16634 35.8335 13.5624 35.8335 21.4997C35.8335 29.437 29.4375 35.833 21.5002 35.833C13.5629 35.833 7.16683 29.437 7.16683 21.4997C7.16683 13.5624 13.5629 7.16634 21.5002 7.16634Z" fill="white"/>
                        <path d="M21.5002 16.125C21.025 16.125 20.5693 16.3138 20.2333 16.6498C19.8973 16.9858 19.7085 17.4415 19.7085 17.9167V30.4583C19.7085 30.9335 19.8973 31.3892 20.2333 31.7252C20.5693 32.0612 21.025 32.25 21.5002 32.25C21.9753 32.25 22.4311 32.0612 22.7671 31.7252C23.1031 31.3892 23.2918 30.9335 23.2918 30.4583V17.9167C23.2918 17.4415 23.1031 16.9858 22.7671 16.6498C22.4311 16.3138 21.9753 16.125 21.5002 16.125Z" fill="white"/>
                        <path d="M23.2918 12.5407C23.2918 13.0159 23.1031 13.4716 22.7671 13.8076C22.4311 14.1436 21.9753 14.3324 21.5002 14.3324C21.025 14.3324 20.5693 14.1436 20.2333 13.8076C19.8973 13.4716 19.7085 13.0159 19.7085 12.5407C19.7085 12.0655 19.8973 11.6098 20.2333 11.2738C20.5693 10.9378 21.025 10.749 21.5002 10.749C21.9753 10.749 22.4311 10.9378 22.7671 11.2738C23.1031 11.6098 23.2918 12.0655 23.2918 12.5407Z" fill="white"/>
                    </svg>
                    <div className='modalIcon'></div>
              </div>
              <div id='graffic' className='textBlock'>
                <PlotTop />
              </div>
            </div>
          </div>
        </div>
        <div className={`topContainer ${containerCurrent !== 1 ? 'hidden' : ''}`}>
          <div id='titleA' className='smallHeight'><h4>Favorite Artists Breakdown</h4></div>
          <div className='iconInfo icon2'>
                <span className="tooltiptext">{isHover} on the chart piece to show artist's name!</span>
                <svg width="100%" height="100%" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5002 3.58301C11.6263 3.58301 3.5835 11.6258 3.5835 21.4997C3.5835 31.3735 11.6263 39.4163 21.5002 39.4163C31.374 39.4163 39.4168 31.3735 39.4168 21.4997C39.4168 11.6258 31.374 3.58301 21.5002 3.58301ZM21.5002 7.16634C29.4375 7.16634 35.8335 13.5624 35.8335 21.4997C35.8335 29.437 29.4375 35.833 21.5002 35.833C13.5629 35.833 7.16683 29.437 7.16683 21.4997C7.16683 13.5624 13.5629 7.16634 21.5002 7.16634Z" fill="white"/>
                    <path d="M21.5002 16.125C21.025 16.125 20.5693 16.3138 20.2333 16.6498C19.8973 16.9858 19.7085 17.4415 19.7085 17.9167V30.4583C19.7085 30.9335 19.8973 31.3892 20.2333 31.7252C20.5693 32.0612 21.025 32.25 21.5002 32.25C21.9753 32.25 22.4311 32.0612 22.7671 31.7252C23.1031 31.3892 23.2918 30.9335 23.2918 30.4583V17.9167C23.2918 17.4415 23.1031 16.9858 22.7671 16.6498C22.4311 16.3138 21.9753 16.125 21.5002 16.125Z" fill="white"/>
                    <path d="M23.2918 12.5407C23.2918 13.0159 23.1031 13.4716 22.7671 13.8076C22.4311 14.1436 21.9753 14.3324 21.5002 14.3324C21.025 14.3324 20.5693 14.1436 20.2333 13.8076C19.8973 13.4716 19.7085 13.0159 19.7085 12.5407C19.7085 12.0655 19.8973 11.6098 20.2333 11.2738C20.5693 10.9378 21.025 10.749 21.5002 10.749C21.9753 10.749 22.4311 10.9378 22.7671 11.2738C23.1031 11.6098 23.2918 12.0655 23.2918 12.5407Z" fill="white"/>
                </svg>
                <div className='modalIcon'></div>
          </div>
          <div className='topMenu'>
            <h4 className={(topTerm === 'current' || topTerm === 'start') ? 'active' : ''} data-value='current' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Now</h4>
            <h4 className={(topTerm === 'short_term' || topTerm === 'start') ? 'active' : ''} data-value='short_term' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Week</h4>
            <h4 className={(topTerm === 'medium_term' || topTerm === 'start') ? 'active' : ''} data-value='medium_term' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Month</h4>
            <h4 className={(topTerm === 'long_term' || topTerm === 'start') ? 'active' : ''} data-value='long_term' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Year</h4>
          </div>
          <div id='info'>
            <div id='grafficA'>
              <PlotSircle term={topTerm} />
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
        <div className={`featureContainer ${containerCurrent !== 2 ? 'hidden' : ''}`}>
          <div id='titleA'><h4>Exploring Peak Features</h4></div>
          <div id='info'>
          <div className='iconInfo icon3'>
                <span className="tooltiptext" >You can also navigate to the feature info by pressing on it's name on the chart!</span>
                <svg width="100%" height="100%" viewBox="0 0 43 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21.5002 3.58301C11.6263 3.58301 3.5835 11.6258 3.5835 21.4997C3.5835 31.3735 11.6263 39.4163 21.5002 39.4163C31.374 39.4163 39.4168 31.3735 39.4168 21.4997C39.4168 11.6258 31.374 3.58301 21.5002 3.58301ZM21.5002 7.16634C29.4375 7.16634 35.8335 13.5624 35.8335 21.4997C35.8335 29.437 29.4375 35.833 21.5002 35.833C13.5629 35.833 7.16683 29.437 7.16683 21.4997C7.16683 13.5624 13.5629 7.16634 21.5002 7.16634Z" fill="white"/>
                    <path d="M21.5002 16.125C21.025 16.125 20.5693 16.3138 20.2333 16.6498C19.8973 16.9858 19.7085 17.4415 19.7085 17.9167V30.4583C19.7085 30.9335 19.8973 31.3892 20.2333 31.7252C20.5693 32.0612 21.025 32.25 21.5002 32.25C21.9753 32.25 22.4311 32.0612 22.7671 31.7252C23.1031 31.3892 23.2918 30.9335 23.2918 30.4583V17.9167C23.2918 17.4415 23.1031 16.9858 22.7671 16.6498C22.4311 16.3138 21.9753 16.125 21.5002 16.125Z" fill="white"/>
                    <path d="M23.2918 12.5407C23.2918 13.0159 23.1031 13.4716 22.7671 13.8076C22.4311 14.1436 21.9753 14.3324 21.5002 14.3324C21.025 14.3324 20.5693 14.1436 20.2333 13.8076C19.8973 13.4716 19.7085 13.0159 19.7085 12.5407C19.7085 12.0655 19.8973 11.6098 20.2333 11.2738C20.5693 10.9378 21.025 10.749 21.5002 10.749C21.9753 10.749 22.4311 10.9378 22.7671 11.2738C23.1031 11.6098 23.2918 12.0655 23.2918 12.5407Z" fill="white"/>
                </svg>
                <div className='modalIcon'></div>
          </div>
            <div id='flex-half'>
              <div className='featureInfo'>
                <FeatureViewer 
                  features={features} 
                  featuresPersent={featuresPersent} 
                  style={{height: "100%"}}
                  currentFeatureIndex={currentFeatureIndex}
                  setCurrentFeatureIndex={setCurrentFeatureIndex}
                />
              </div>
            </div>
            <div id='flex-half'>
              <PlotWeb features={features}  setCurrentFeatureIndex={setCurrentFeatureIndex}/>
            </div>
          </div>
        </div>
        <div className={`recommendationContainer ${containerCurrent !== 3 ? 'hidden' : ''}`}>
          <div id='titleA'><h4>Recommendations Worldwide</h4></div>
          <div id='listing'>
            <div className='countries' >
              <Select options={options} value={value} onChange={(changeHandler)} 
              placeholder="Select country" width='100%' 
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(58, 29, 78, 1)',
                  color: 'white',
                  border: 'none',
                  boxShadow: 'none',
                  borderRadius: '50%',
                  fontFamily: 'Lexend',
                  width: '100%',
                  fontSize: '1.5vw',
                  '&:hover': {
                    color: 'white',
                    cursor: 'pointer',
                  },
                }),
                singleValue: (provided) => ({
                  ...provided,
                  color: 'white',
                  width: '100%',
                }),
                indicatorSeparator: () => null,
                dropdownIndicator: (provided) => ({
                  ...provided,
                  color: 'white',
                  '&:hover': {
                    color: 'white',
                    cursor: 'pointer',
                  },
                }),
                option: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(58, 29, 78, 1)',
                  color: 'white', 
                  width: '100%',
                  '&:hover': {
                    color: 'grey',
                    cursor: 'pointer',
                  },
                }),
                placeholder: (provided)=> ({
                  ...provided,
                  color: 'white', 
                  width: '100%',
                }),
                '&:hover': {
                    cursor: 'pointer',
                  },
                  width: '60%'
              }}
              />

            </div>
            <div className='hiddenFeature'>
              <RecSelector  funcArray={options} setFuncArray={changeHandler}/>
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
        <div className={`hiddenArrowMenu ${containerCurrent === 3 ? 'hidden' : ''}`}>
          <svg onClick={handlePlusMate} width="100%" viewBox="0 0 88 91" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_15_85)" filter="url(#filter0_d_15_85)">
            <path d="M36.3 24.53L35.0067 26.4491L47.5083 45L35.0067 63.5509L36.3 65.47L50.095 45L36.3 24.53Z" fill="white"/>
            </g>
            <g filter="url(#filter1_f_15_85)">
            <circle cx="44" cy="45" r="9" fill="#FFF8F8" fillOpacity="0.7"/>
            </g>
            <defs>
            <filter id="filter0_d_15_85" x="23" y="22" width="39" height="54" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
            <feOffset dy="4"/>
            <feGaussianBlur stdDeviation="2"/>
            <feComposite in2="hardAlpha" operator="out"/>
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_15_85"/>
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_15_85" result="shape"/>
            </filter>
            <filter id="filter1_f_15_85" x="0" y="1" width="88" height="88" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
            <feFlood floodOpacity="0" result="BackgroundImageFix"/>
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
            <feGaussianBlur stdDeviation="17.5" result="effect1_foregroundBlur_15_85"/>
            </filter>
            <clipPath id="clip0_15_85">
            <rect width="31" height="46" fill="white" transform="translate(27 22)"/>
            </clipPath>
            </defs>
          </svg>
        </div>
        <CircleWrapper>
            {containersArray.map((feature, index) => (
            <Circle
                key={index}
                $isActive={index === containerCurrent}
                onClick={() => setContainerCurrent(index)}
            />
            ))}
        </CircleWrapper>
      </div>
      <div className='power'>
        <div>Powered by</div>
        <a href="https://spotify.com">
          <img 
            src={SpotifyLogoWhite} 
            alt='Spotify'
            loading="lazy"
          />
        </a>
      </div>
    </div>
  );
}

const CircleWrapper = styled.div`
  visibility: hidden;
  position: absolute;
  @media (max-width: 700px) {
    visibility: visible;
    display: flex;
    justify-content: center;
    margin-top: 20px;
    bottom:2%;
    left: 35%;
  }
`;

const Circle = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: white;
  margin-right: 1rem;
  cursor: pointer;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background-color: transparent;
    border-radius: 50%;
    border: 1px transparent solid;
    border-color: ${(props) => (props.$isActive ? 'white' : 'transparent')};
  }
`;

export default Menu;
