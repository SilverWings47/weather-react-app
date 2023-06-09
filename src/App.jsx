import { useEffect, useState } from "react";
import { ImLocation } from "react-icons/im";
import Form from "./Form";
import MoreStats from "./MoreStats";

function App() {
  const [weatherInfo, setWeatherInfo] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const getCoords = () => {
    const options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };

    function success(pos) {
      const crd = pos.coords;
      loadWeather(
        `https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=7adbefc731f411aa772455e627de1b9c&units=metric`
      );
    }

    function error(err) {
      console.warn(`ERROR(${err.code}): ${err.message}`);
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const loadWeather = async (url) => {
    try {
      const response = await fetch(url);
      const result = await response.json();
      const weatherObj = {
        city: result.name,
        img: `https://openweathermap.org/img/wn/${result.weather[0].icon}@4x.png`,
        temp: result.main.temp,
        feelsLike: result.main.feels_like,
        windSpeed: result.wind.speed,
        windDir: getCardinalDirection(result.wind.deg),
        humidity: result.main.humidity,
        descritption : result.weather[0].main
      };
      console.log(result);
      setWeatherInfo(weatherObj);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const getCardinalDirection = (angle) => {
    const directions = [
      "↑ N",
      "↗ NE",
      "→ E",
      "↘ SE",
      "↓ S",
      "↙ SW",
      "← W",
      "↖ NW",
    ];
    return directions[Math.round(angle / 45) % 8];
  };

  useEffect(() => {
    getCoords();
  }, []);

  return (
    <main className="container">
      <Form loadWeather={loadWeather} />
      {!isLoading ? (
        <div>
          <img src={weatherInfo.img} />
          <p className="weather-description">{weatherInfo.descritption}</p>
          <p className="temp">{`${parseInt(weatherInfo.temp)}°` || "--°"}</p>
          <p className="city">
            <ImLocation className="gps-icon" />
            {weatherInfo.city || "--"}
          </p>
          <MoreStats weatherInfo={weatherInfo} />
        </div>
      ) : (
        <p style={{textAlign : 'center', fontSize : '3rem', marginTop : '5rem'}}>Loading</p>
      )}
    </main>
  );
}

export default App;
