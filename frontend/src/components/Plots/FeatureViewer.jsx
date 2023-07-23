/* eslint-disable jsx-a11y/iframe-has-title */
import React, { useEffect, useState } from 'react';
import featureDescriptions from 'src/util/text';
import styled from "styled-components";
import arrowRight from 'src/assets/images/arrow-right.png';
import arrowLeft from 'src/assets/images/arrow-left.png';
import noimage from 'src/assets/images/NOimage.png';

const FeatureViewer = ({ features }) => {
  const featureArray = Object.keys(features);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);
  const [currentValue, setCurrentValue] = useState({}); 

  const switchToNextFeature = () => {
    setCurrentFeatureIndex((prevIndex) => (prevIndex + 1) % featureArray.length);
  };

  const switchToPreviousFeature = () => {
    setCurrentFeatureIndex((prevIndex) =>
      prevIndex === 0 ? featureArray.length - 1 : prevIndex - 1
    );
  };

  const currentFeature = featureArray[currentFeatureIndex];
  const currentFeatureDescription = featureDescriptions.find(
    (feature) => feature.name === currentFeature
  );

  useEffect(() => {
    setCurrentValue(features[featureArray[currentFeatureIndex]]);
  }, [currentFeatureIndex, features, featureArray]);

  return (
    <FeatureWrapper>
      {currentFeature ? (
        <div className='FWContainer'>
          <h3>{currentFeature}</h3>
          <div className='middleBody'>
            <img className="arrowImg" src={arrowLeft} onClick={switchToPreviousFeature} alt='Arrow right'/>
            <div className='textBody'>
                <div className='texBody-text'>
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
            </div>
            <img className="arrowImg" src={arrowRight} onClick={switchToNextFeature} alt='Arrow right'/>
          </div>
          <CircleWrapper>
            {featureArray.map((feature, index) => (
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
  position: relative;
  .FWContainer{
    width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;

    h3 {
        ${'' /* font-size: 1.4vw; */}
        font-size: 2vw;
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
        gap: 3%;

        .textBody{
            position: relative;
            text-align: justify;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 5%;
            .texBody-text{
                width: 45%;
                position: relative;
            }
            .texBody-example{
                width: 45%;
                ${'' /* width: 100%; */}
                position: relative;
                display: flex;
                flex-direction: column;
                align-items: center;
                ${'' /* margin-top:10%; */}
                .teimg{
                  width: 70%;
                }
                .teframe{
                  width: 100%;
                  aspect-ratio: 3/5;
                  border-radius: 20px;
                  border-color: transparent;
                  frame-border: 0;
                  background-color: transparent;
                }
                .teframe2{
                  width: 100%;
                  aspect-ratio: 10/2;
                  border-radius: 12px;
                  border-color: transparent;
                  frame-border: 0;
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
