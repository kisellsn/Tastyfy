import React, { useState } from 'react';
import styled from "styled-components";
import down from "../../assets/images/downSelect.svg"

const RecSelector = ({ funcArray, setFuncArray }) => {
  const [selectedFeatureIndex, setSelectedFeatureIndex] = useState(0);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleSelectChange = (feature, index) => {
    setSelectedFeatureIndex(index);
    setFuncArray(feature); // Assuming you want to set the current feature index somewhere
    setIsDropdownOpen(false);
  };
  console.log()

  return (
    <CustomSelectWrapper>
      <SelectBox
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        $isOpen={isDropdownOpen} 
      >
        <SelectedValue>{funcArray[selectedFeatureIndex].label}</SelectedValue>
        <OptionsList $isOpen={isDropdownOpen}>
          {funcArray.map((feature, index) => (
            <OptionItem
              key={index}
              onClick={() => handleSelectChange(feature, index)}
              $isFirst={index === 0}
              $isLast={index === funcArray.length - 1}
            >
              {feature.label}
            </OptionItem>
          ))}
        </OptionsList>
      </SelectBox>
      <ArrowIcon
          src={down}
          alt="Arrow Icon"
          aria-hidden="true"
          style={{zIndex:'-1'}}
        />
    </CustomSelectWrapper>
  );
};

const CustomSelectWrapper = styled.div`
  z-index: 40;
  position: relative;
  display:flex;
  align-items: center;
  flex-direction:column;
`;

const SelectBox = styled.div`
  width:50%;
  height:auto;
  aspect-ratio:122/22;
  display: flex;
  align-items: center;
  padding: 1% 2%;
  border: none;
  border-radius: 10px;
  background-color: rgba(217, 217, 217, 0.2);
  cursor: pointer;
  font-size: 2.7vw;
  text-align: center;
  color: white;
  margin-bottom: 2%;
  box-shadow: 0px 10px 9px rgba(0, 0, 0, 0.25);

`;

const SelectedValue = styled.div`
  flex: 1;
`;

const ArrowIcon = styled.img`
  height: 33%;
  opacity: 0.5;
  color: white;
  transition: transform 0.2s ease;
  transform: ${({ $isOpen }) => ($isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

const OptionsList = styled.ul`
  display: ${({ $isOpen }) => ($isOpen ? 'block' : 'none')};
  position: absolute;
  top: -20%;
  left: 23%;
  width: 54%;
  max-height: 200px; // Set your desired max height for the list
  overflow-y: auto; 

  margin-top: 4px;
  padding: 0;
  list-style: none;
  border: none;
  border-top: none;
  border-radius: 10px ;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const OptionItem = styled.li`
  padding: 5% 2%;
  background-color: rgba(88, 67, 127, 1);
  cursor: pointer;
  ${({ $isFirst, $isLast }) => {
    if ($isFirst) {
      return 'border-radius: 10px 10px 0 0;';
    } else if ($isLast) {
      return 'border-radius: 0 0 10px 10px;';
    } else {
      return '';
    }
  }}
`;

export default RecSelector;
