/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import featureDescriptions from 'src/util/text';
import styled from "styled-components";
import arrowRight from 'src/assets/images/arrow-right.png';
import arrowLeft from 'src/assets/images/arrow-left.png';
import noimage from 'src/assets/images/NOimage.png';
import { swipeLeft, swipeRight } from 'src/util/swiper';


const FeatureViewer = ({ features, featuresPersent, currentFeatureIndex, setCurrentFeatureIndex }) => {
  const featureArray = Object.keys(features);
  const newFeatureArray = ['What is this?', ...featureArray.map(item => features[item])];
  const [currentValue, setCurrentValue] = useState({}); 
  const [currentText, setCurrentText] = useState({}); 


  const switchToNextFeature = () => {
    let newIndex = (prevIndex) => (prevIndex + 1) % newFeatureArray.length;
    swipeRight(setCurrentFeatureIndex, newIndex);
  };

  const switchToPreviousFeature = () => {
    let newIndex = (prevIndex) => prevIndex === 0 ? newFeatureArray.length - 1 : prevIndex - 1;
    swipeLeft(setCurrentFeatureIndex, newIndex);

  };
  let currentFeature;
  if(currentFeatureIndex === 0){
    currentFeature = 'What is this?'
  }else{
    currentFeature = featureArray[currentFeatureIndex-1];
  }

  const currentFeatureDescription = featureDescriptions.find(
    (feature) => feature.name === currentFeature
  );


  useEffect(() => {

      setCurrentValue(features[featureArray[currentFeatureIndex-1]]);
      setCurrentText(featuresPersent[featureArray[currentFeatureIndex-1]]);

  }, [currentFeatureIndex, features, featureArray, featuresPersent]);

  return (
    <FeatureWrapper>
      {currentFeature ? (
        <div className='FWContainer'>
          <div id="swipeTitle" style={{position: 'relative'}}><h3>{currentFeature}</h3></div>
          <div className='middleBody mySwiper' >
            <img className="arrowImg" src={arrowLeft} onClick={switchToPreviousFeature} alt='Arrow right'/>
            <div className='textBody' id="swipeContainer">
              {(currentFeatureIndex !== 0) ? (
                <>
                  <div className='texBody-text'>
                    <p>Your personal value for this feature is {currentText}%.</p>
                    <p>{currentFeatureDescription?.text || 'Description not available.'}</p>
                  </div>
                  <div className='texBody-example'>
                    {currentValue ? (
                      <iframe 
                        className='teframe'
                        src={`https://open.spotify.com/embed/track/${currentValue.id}?utm_source=generator`}
                        allowFullScreen="" 
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
                        loading="lazy">
                      </iframe>
                    ) : (
                      <img className='teimg' src={currentValue?.album.images[0].url || noimage} alt="Song"/>
                    )}
                  </div>
                </>
              ) : (
                <div className={`texBody-text ${currentFeatureIndex === 0 ? 'firstElement' : ''}`}>
                    <p>{currentFeatureDescription?.text || 'Description not available.'}</p>
                </div>
              )}
            </div>
            <img className="arrowImg swiper-button-prev" src={arrowRight} onClick={switchToNextFeature} alt='Arrow right'/>
          </div>
          <CircleWrapper>
            {newFeatureArray.map((feature, index) => (
            <Circle
                key={index}
                $isActive={index === currentFeatureIndex}
                onClick={() => setCurrentFeatureIndex(index)}
            />
            ))}
          </CircleWrapper>
          
        </div>
      ) : (
        <p>
          Loading data...
        </p>
      )}


    </FeatureWrapper>
  );
};

const FeatureWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .FWContainer{
    width: 100%;
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;

    h3 {
        ${'' /* font-size: 1.4vw; */}
        font-size: 2vw;
        margin-top:0;
    }
    p{
        ${'' /* font-size: 1vw; */}
        font-size: 1.4vw;
    }
    .middleBody{
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        height: 80%;
        gap: 3%;

        .textBody{
            position: relative;
            padding-top: 5%;
            text-align: justify;
            display: flex;
            flex-direction: row;
            align-items: stretch;
            justify-content: space-between;
            height: 100%;
            gap: 5%;
            .texBody-text{
                width: 45%;
                position: relative;
                p{
                  margin-block-start: 0;
                  margin-block-end: 0;
                }
            }
            .firstElement{
              width: 100%;
              text-align: center;
              display: flex;
              align-items: center;
              padding-bottom: 5%;
              p{
                  font-size: 2vw;
                }
            }
            .texBody-example{
                width: 45%;
                position: relative;
                .teframe{
                  width: 100%;
                  height:100%;
                  border-radius: 25px;
                  border-color: transparent;
                  frame-border: 0;
                  background-color: transparent;
                }
            }
        }

        .arrowImg{
            width: 5%;
            margin-top: -5%;
            &:hover{
                cursor: pointer;
            }
        }
    }

    .circles{
        display: flex;
        justify-content: center;
        margin-top: 20px;
    }
  }

`



const CircleWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  @media (max-width: 700px) {
    visibility: hidden;
    position: absolute;
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



export default FeatureViewer;
