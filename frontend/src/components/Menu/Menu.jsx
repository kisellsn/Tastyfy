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
import { clearLocalStorage, getUserFromStorage, storeUser } from 'src/util/local';



function Menu(props) {

  const startRef = useRef(Date.now());
  useEffect(() => {
    if(getUserFromStorage()) return;
    getToken().then(token => {
      if (!token.Authorization) navigate('/');
    })
    registerSpotify().then(user => {
      if (!user) navigate('/');
      storeUser(user);
      setUserInfo(user);
    });
  })

  const [userInfo, setUserInfo] = useState(getUserFromStorage());
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthorization = () => {
      const user = getUserFromStorage();
      if (Date.now() - startRef > 3600000) {
        clearLocalStorage();
        navigate('/');
      } else {
        storeUser(user);
        setUserInfo(user);
      }
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
  return (
    <div id='analytics' className={props.className}>
      <Header url={url}  linkUser={linkUser} back={"rgb(26, 0, 36)"}/>
      <div id='analyze'>
        <div className='musicContainer'>
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
        <div className='topContainer'>
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
        <div className='featureContainer'>
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
        <div className='recommendationContainer'>
          <div id='titleA'><h4>Recommendations Worldwide</h4></div>
          <div id='listing'>
            <div className='countries' >
              <Select options={options} value={value} onChange={(changeHandler)} 
              placeholder="Select country"
              styles={{
                control: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(58, 29, 78, 1)',
                  color: 'white',
                  border: 'none',
                  boxShadow: 'none',
                  borderRadius: '50%',
                  fontFamily: 'Lexend',
                  fontSize: '1.5vw',
                  '&:hover': {
                    color: 'white',
                    cursor: 'pointer',
                  },
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
                    cursor: 'pointer',
                  },
                }),
                option: (provided) => ({
                  ...provided,
                  backgroundColor: 'rgba(58, 29, 78, 1)',
                  color: 'white', 
                  '&:hover': {
                    color: 'grey',
                    cursor: 'pointer',
                  },
                }),
                placeholder: (provided)=> ({
                  ...provided,
                  color: 'white', 
                }),
                '&:hover': {
                    cursor: 'pointer',
                  },
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
