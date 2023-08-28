import React, { useState } from "react";


const WeatherForecast = ({ forecastData }) => {

  const groupForecastByDay = () => {
    const groupedData = {};

    forecastData.list.forEach(item => {
      const date = item.dt_txt.split(" ")[0];
      const hour = item.dt_txt.split(" ")[1];

      if (!groupedData[date]) {
        groupedData[date] = {
          temp_max: [],
          temp_min: [],
          hours: {},
          icon: item.weather[0].icon,
          description: item.weather[0].description
        };
      }

      groupedData[date].temp_max.push(item.main.temp_max);
      groupedData[date].temp_min.push(item.main.temp_min);

      groupedData[date].hours[hour] = {
        temp: item.main.temp,
        humidity: item.main.humidity,
        wind: item.wind.speed
      };
    });

    return groupedData;
  };

  const calculateAverageTemp = temperatures => {
    const totalTemp = temperatures.reduce((sum, temp) => sum + (temp - 273.15), 0);
    return totalTemp / temperatures.length;
  };

  const groupedForecast = groupForecastByDay();

  const [selectedDate, setSelectedDate] = useState(new Date());

  const selectedDateObj = new Date(selectedDate);
  const year = selectedDateObj.getFullYear();
  const month = String(selectedDateObj.getMonth() + 1).padStart(2, "0");
  const day = String(selectedDateObj.getDate()).padStart(2, "0");
  const formattedSelectedDate = `${year}-${month}-${day}`;

  const selectedDateDetails = groupedForecast[formattedSelectedDate];

  return (
    <div className="forecast">
      <div className="forecast__header">
        <div className="forecast-title">Weather in {forecastData.city.name} ({forecastData.city.country})</div>
      </div>
      <div className="forecast__body">
        {Object.entries(groupedForecast).map(([date, data]) => {
          const averageMaxTemp = calculateAverageTemp(data.temp_max);
          const averageMinTemp = calculateAverageTemp(data.temp_min);

          const dateObj = new Date(date);
          const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "long" });
          const formattedDate = dateObj.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          });

          const handleCardClick = (date) => {
            setSelectedDate(date);
          }

          return (

            <div className="forecast-by-date"
              key={date}
              onClick={() => handleCardClick(date, data)}>
              <div className="day-of-week">{dayOfWeek}</div>
              <div className="date">{formattedDate}</div>
              <img
                src={`http://openweathermap.org/img/wn/${data.icon}@2x.png`}
                alt="weather-icon"
              />
              <div className="temperature">
                <div className="temperature__title">
                  <span className="min-temp-title">min</span>
                  <span className="max-temp-title">max</span>
                </div>
                <div className="temperature__data">
                  <span className="min-temp">
                    {averageMinTemp !== 0 ? (averageMinTemp > 0 ? "+" : "-") : ""}
                    {Math.round(averageMinTemp)}°
                  </span>
                  <span className="max-temp">
                    {averageMaxTemp !== 0 ? (averageMaxTemp > 0 ? "+" : "-") : ""}
                    {Math.round(averageMaxTemp)}°
                  </span>
                </div>
              </div>
              <div className="description">{data.description}</div>
            </div>
          );
        })}
      </div>
      <div className="forecast__footer">
        <div className="left-panel">
          <div className="date">{formattedSelectedDate}</div>
          <div className="temperature">Temp, °C</div>
          <div className="humidity">Humidity, %</div>
          <div className="wind">Wind, m/s</div>
        </div>
        <div className="right-panel">
          {Object.entries(selectedDateDetails.hours).map(([hour, details]) => (
            <div className="forecast-hourly" key={hour}>
              <div className="hour">{hour.slice(0, 5)}</div>
              <div className="temperature">
              {details.temp - 273.15 !== 0 ? (details.temp - 273.15 > 0 ? "+" : "-") : ""}
                {Math.abs(Math.round(details.temp - 273.15))}°
                </div>
              <div className="humidity">{details.humidity}</div>
              <div className="wind">{details.wind}</div>
            </div>
          ))
          }
        </div>
      </div>
    </div>
  );
};

export default WeatherForecast;
