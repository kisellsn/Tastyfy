import { React, useEffect, useMemo, useRef, useState } from 'react';
import './Menu.scss';
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
import { getUserFromStorage, storeUser } from 'src/util/local';



function Menu(props) {
  const [userInfo, setUserInfo] = useState(getUserFromStorage());
  const navigate = useNavigate();
  const topSongRef = useRef([]);
  useEffect(() => {
    if(getUserFromStorage()) return;
    getToken().then(token => {
      if (!token) navigate('/');
    })
    registerSpotify().then(user => {
      if (!user) navigate('/');
      else {
        storeUser(user);
        setUserInfo(user);
      }

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
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

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
          const tops = await getTops(topTerm);
          topSongRef.current = tops
          setTopSong(tops);


      } catch (error) {
        console.error('Error fetching top songs:', error);
        // Handle the error
      }
    };
  
    fetchTopSongs();
  }, [topTerm]);

  
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

  useEffect(() => {
    const fetchText = async () => {
      try {
        const text = await getText();
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
        const data = await featureDiagram();
        setFeatures(data.best);
        setFeaturesPersent(data.features_dict);
      } catch (error) {
        console.error('Error fetching plot data:', error);
      }
    }

    fetchData();
  }, []);
  
  let url = ''
  if (userInfo?.images) url=userInfo.images[0].url

  const linkUser = () => {
    const url = userInfo.external_urls.spotify;
    window.location.href = url;
  };

  const [containerCurrent, setContainerCurrent] = useState(2);
  const [circleColor, setCircleColor] = useState('rgba(22, 97, 47, 1)');



  const handlePlusMate =() => {
    let newMate = containerCurrent+1
    if(newMate>3)newMate=newMate-4
    setContainerCurrent(newMate)
    if(newMate === 0)setCircleColor('rgba(8, 99, 99, 1)');
    if(newMate === 1)setCircleColor('rgba(108, 3, 97, 1)');
    if(newMate === 2)setCircleColor('rgba(22, 97, 47, 1)');
    if(newMate === 3)setCircleColor('rgba(8, 99, 99, 1)');
  }
  const handleMinusMate =() => {
    let newMate = containerCurrent-1
    if(newMate<0)newMate=newMate+4
    setContainerCurrent(newMate)
    if(newMate === 0)setCircleColor('rgba(8, 99, 99, 1)');
    if(newMate === 1)setCircleColor('rgba(108, 3, 97, 1)');
    if(newMate === 2)setCircleColor('rgba(8, 99, 99, 1)');
    if(newMate === 3)setCircleColor('rgba(8, 99, 99, 1)');
  }
  return (
    <div id='analytics' className={props.className}>
      <Header url={url}  linkUser={linkUser} back={"rgb(26, 0, 36)"}/>
      <div className='circleMenu' style={{backgroundColor:`${circleColor}`}}></div>
      <div></div>
      <div id='analyze'>
        <div className='hiddenArrowMenu'>
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
                {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                 */}
                 {textMusic}
              </div>
            </div>
            <div id='infoRight'>
              <div id='graffic' className='textBlock'>
                {/* <img id='stat'src={VectorImage} loading="lazy" alt={'Vector'} /> */}
                <PlotTop />
              </div>
            </div>
          </div>
        </div>
        <div className={`topContainer ${containerCurrent !== 1 ? 'hidden' : ''}`}>
          <div id='titleA' className='smallHeight'><h4>Favorite Artists Breakdown</h4></div>
          <div className='topMenu'>
            <h4 className={(topTerm === 'current' || topTerm === 'start') ? 'active' : ''} data-value='current' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Now</h4>
            <h4 className={(topTerm === 'short_term' || topTerm === 'start') ? 'active' : ''} data-value='short_term' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Week</h4>
            <h4 className={(topTerm === 'medium_term' || topTerm === 'start') ? 'active' : ''} data-value='medium_term' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Month</h4>
            <h4 className={(topTerm === 'long_term' || topTerm === 'start') ? 'active' : ''} data-value='long_term' onClick={(event)=> setTopTerm(event.target.dataset.value)}>Year</h4>
          </div>
          <div id='info'>
            <div id='grafficA'>
              {/* <img id='sircle'src={Sircle} loading="lazy" alt={'Vector'} /> */}
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
        <div className='hiddenArrowMenu'>
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
      </div>
    </div>
  );
}

export default Menu;
