import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.scss";
import CurrentDate from "../CurrentDate/CurrentDate.js";
import CitySearch from "../CitySearch/CitySearch";
import WeatherForecast from "../WeatherForecast/WeatherForecast";
import urls from '../../enums/urls.js';
import { toast } from 'react-toastify';


export default function Home() {
  const [kyivData, setKyivData] = useState({});
  const [londonData, setLondonData] = useState({});
  const [newYorkData, setNewYorkData] = useState({});
  const [cityData, setCityData] = useState({});


  useEffect(() => {
    axios.get(urls.kyivUrl).then((response) => {
      setKyivData(response.data);
    });

    axios.get(urls.londonUrl).then((response) => {
      setLondonData(response.data);
    });

    axios.get(urls.newYorkUrl).then((response) => {
      setNewYorkData(response.data);
    });
  }, []);

  const [city, setCity] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  const handleCityChange = (e) => {
    setCity(e.target.value);
  }

  const handleButtonClick = async (e) => {

    const cityUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=83388bf1586d1c2ce407b1f5c7ae14af`;
    try {
      const response = await axios.get(cityUrl);
      setCityData(response.data);
      setIsSubmit(true);
    } catch (error) {
      toast.error(error.message, {
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'light',
      });
    }
  }


  return (
    <div className="Home-wrapper">
      <div className="header">
        <CurrentDate />
        <CitySearch
          onChange={handleCityChange}
          onClick={handleButtonClick}
          city={city}
        />
      </div>
      <div className="city-data">
        {isSubmit ?
          <WeatherForecast 
          forecastData={cityData}
          /> 
          :
          <>
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
                <img src={'http://openweathermap.org/img/wn/' + kyivData.weather[0].icon + '@2x.png'} alt="weather-icon" />}
              </div>
              <div className="city-weather__item">
                {londonData.weather &&
                  londonData.weather[0].icon && <img src={'http://openweathermap.org/img/wn/' + londonData.weather[0].icon + '@2x.png'} alt="weather-icon" />}
              </div>
              <div className="city-weather__item">
                {newYorkData.weather &&
                  newYorkData.weather[0].icon && <img src={'http://openweathermap.org/img/wn/' + newYorkData.weather[0].icon + '@2x.png'} alt="weather-icon" />}
              </div>
            </div>
          </>
        }
      </div>
    </div >
  );
}



