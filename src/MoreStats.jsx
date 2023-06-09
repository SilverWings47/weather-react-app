import Card from "./Card";

const MoreStats = ({ weatherInfo }) => {
  return (
    <div className="cards">
      <Card title="Wind Speed (Km/h)" value={parseInt(weatherInfo.windSpeed)} />
      <Card title="Feels Like" value={`${parseInt(weatherInfo.feelsLike)}°`} />
      <Card title="Wind Direction" value={weatherInfo.windDir} />
      <Card title="Humidity (%)" value={weatherInfo.humidity} />
    </div>
  );
};

export default MoreStats;
