/* eslint-disable jsx-a11y/iframe-has-title */
import React  from 'react';
import styled from "styled-components";


const  FeatureSelector = ({ featureArray, setCurrentFeatureIndex }) => {


  return (
    <FeatureWrapper>
        <div className="select-box">
            <div className="select-box__current" tabindex="1">
                <div className="select-box__value">
                <input className="select-box__input" type="radio" id="0" value="1" name="Ben" checked="checked"/>
                <p className="select-box__input-text">Cream</p>
                </div>
                <div className="select-box__value">
                <input className="select-box__input" type="radio" id="1" value="2" name="Ben" checked="checked"/>
                <p className="select-box__input-text">Cheese</p>
                </div>
                <div className="select-box__value">
                <input className="select-box__input" type="radio" id="2" value="3" name="Ben" checked="checked"/>
                <p className="select-box__input-text">Milk</p>
                </div>
                <div className="select-box__value">
                <input className="select-box__input" type="radio" id="3" value="4" name="Ben" checked="checked"/>
                <p className="select-box__input-text">Honey</p>
                </div>
                <div className="select-box__value">
                <input className="select-box__input" type="radio" id="4" value="5" name="Ben" checked="checked"/>
                <p className="select-box__input-text">Toast</p>
                </div><img className="select-box__icon" src="http://cdn.onlinewebfonts.com/svg/img_295694.svg" alt="Arrow Icon" ariaHidden="true"/>
            </div>
            <ul className="select-box__list">
                <li>
                <label class="select-box__option" for="0" ariaHidden="ariaHidden">Cream</label>
                </li>
                <li>
                <label class="select-box__option" for="1" ariaHidden="ariaHidden">Cheese</label>
                </li>
                <li>
                <label class="select-box__option" for="2" ariaHidden="ariaHidden">Milk</label>
                </li>
                <li>
                <label class="select-box__option" for="3" ariaHidden="ariaHidden">Honey</label>
                </li>
                <li>
                <label class="select-box__option" for="4" ariaHidden="ariaHidden">Toast</label>
                </li>
            </ul>
        </div>
    </FeatureWrapper>
  );
};

const FeatureWrapper = styled.div`
    .select-box {
  position: relative;
  display: block;
  width: 100%;
  font-size: 18px;
  color: #60666d;
  z-index: 40;
}

.select-box__current {
  position: relative;
  box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  outline: none;
}
.select-box__current:focus + .select-box__list {
  opacity: 1;
  -webkit-animation-name: none;
          animation-name: none;
}
.select-box__current:focus + .select-box__list .select-box__option {
  cursor: pointer;
}
.select-box__current:focus .select-box__icon {
  -webkit-transform: translateY(-50%) rotate(180deg);
          transform: translateY(-50%) rotate(180deg);
}
.select-box__icon {
  position: absolute;
  top: 50%;
  right: 15px;
  -webkit-transform: translateY(-50%);
          transform: translateY(-50%);
  width: 20px;
  opacity: 0.3;
  transition: 0.2s ease;
}
.select-box__value {
  display: flex;
}
.select-box__input {
  display: none;
}
.select-box__input:checked + .select-box__input-text {
  display: block;
}
.select-box__input-text {
  display: none;
  width: 100%;
  margin: 0;
  padding: 15px;
  background-color: #fff;
}
.select-box__list {
    position: absolute;
    width: 100%;
    padding: 0;
    list-style: none;
    opacity: 0;
    animation-name: HideList;
    animation-duration: 0.5s;
    animation-delay: 0.5s;
    animation-fill-mode: forwards;
    animation-timing-function: step-start;
    box-shadow: 0 15px 30px -10px rgba(0, 0, 0, 0.1);
}
.select-box__option {
  display: block;
  padding: 15px;
  background-color: #fff;
}
.select-box__option:hover, .select-box__option:focus {
  color: #546c84;
  background-color: #fbfbfb;
}


@keyframes HideList {
  from {
    -webkit-transform: scaleY(1);
            transform: scaleY(1);
  }
  to {
    -webkit-transform: scaleY(0);
            transform: scaleY(0);
  }
}
`
export default FeatureSelector;
