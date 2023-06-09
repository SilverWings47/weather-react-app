import { useState } from "react";
const Form = ({ loadWeather }) => {
  const [search, setSearch] = useState("");

  const handleClick = () => {
    if(search === '') return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=7adbefc731f411aa772455e627de1b9c&units=metric`;
    loadWeather(url);
  }

  return (
    <form className="form" onSubmit={(e) => e.preventDefault()}>
      <input
        className="search"
        placeholder="Search"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={handleClick}>Change</button>
    </form>
  );
};

export default Form;
