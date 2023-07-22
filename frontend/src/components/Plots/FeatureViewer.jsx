import React, { useState } from 'react';
import featureDescriptions from 'src/util/text';
import styled from "styled-components";
import arrowRight from 'src/assets/images/arrow-right.png';
import arrowLeft from 'src/assets/images/arrow-left.png';

const FeatureViewer = ({ features }) => {
  const featureArray = Object.keys(features);
  const [currentFeatureIndex, setCurrentFeatureIndex] = useState(0);

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
                <div className='texBody-example'>fdfd</div>
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
        font-size: 1.4vw;
    }
    p{
        font-size: 1vw;
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
                position: relative;
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
