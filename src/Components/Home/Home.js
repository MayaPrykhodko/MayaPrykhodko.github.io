import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
import CurrentDate from "../CurrentDate/CurrentDate.js";


export default function Main() {
  const [kyivData, setKyivData] = useState({});
  const [londonData, setLondonData] = useState({});
  const [newYorkData, setNewYorkData] = useState({});


  const kyivUrl =
    "http://api.openweathermap.org/data/2.5/weather?id=703448&appid=bf35cac91880cb98375230fb443a116f";
  const londonUrl =
    "http://api.openweathermap.org/data/2.5/weather?id=2643743&appid=bf35cac91880cb98375230fb443a116f";
  const newYorkUrl =
    "http://api.openweathermap.org/data/2.5/weather?id=5128638&appid=bf35cac91880cb98375230fb443a116f";


  useEffect(() => {
    axios.get(kyivUrl).then((response) => {
      setKyivData(response.data);
    });

    axios.get(londonUrl).then((response) => {
      setLondonData(response.data);
    });

    axios.get(newYorkUrl).then((response) => {
      setNewYorkData(response.data);
    });
  }, []);

  return (
    <div className="Home-wrapper">
      <CurrentDate />
      <div className="city-data">
        <div className="city-list">
          <div className="city-title">Kyiv</div>
          <div className="city-title">London</div>
          <div className="city-title">New York</div>
        </div>
        <div className="city-weather">
          <div className="city-weather__item">
            <div className="city-temperature">
              {kyivData.main &&
                kyivData.main.temp &&
                `${Math.round(kyivData.main.temp - 273.15)}°C`}
            </div>
            <div className="city-cloudiness">{kyivData.weather &&
              kyivData.weather[0].description}</div>
          </div>
          <div className="city-weather__item">
            <div className="city-temperature">
              {londonData.main &&
                londonData.main.temp &&
                `${Math.round(londonData.main.temp - 273.15)}°C`}
            </div>
            <div className="city-cloudiness">{londonData.weather &&
              londonData.weather[0].description}</div>
          </div>
          <div className="city-weather__item">
            <div className="city-temperature">
              {newYorkData.main &&
                newYorkData.main.temp &&
                `${Math.round(newYorkData.main.temp - 273.15)}°C`}
            </div>
            <div className="city-cloudiness">{newYorkData.weather &&
              newYorkData.weather[0].description}</div>
          </div>
        </div>
        <div className="city-weather-icons">
          <div className="city-weather__item"> {kyivData.weather &&
              kyivData.weather[0].icon &&
        <img src= {'http://openweathermap.org/img/wn/'+ kyivData.weather[0].icon+'@2x.png'} alt ="weather-icon"/>}
          </div> 
          <div className="city-weather__item">
          {londonData.weather &&
              londonData.weather[0].icon && <img src= {'http://openweathermap.org/img/wn/'+ londonData.weather[0].icon+'@2x.png'} alt ="weather-icon"/>}
          </div>
          <div className="city-weather__item">
          {newYorkData.weather &&
              newYorkData.weather[0].icon && <img src= {'http://openweathermap.org/img/wn/'+ newYorkData.weather[0].icon+'@2x.png'} alt ="weather-icon"/>}
          </div>
        </div>
      </div>
    </div >
  );
}



