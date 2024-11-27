import { useState, useEffect } from "react";
import axios from "axios";
import countryService from "./services/countries";

const App = (props) => {
  const [countries, setCountries] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [visibleItems, setVisibleItems] = useState({});
  const [weatherData, setWeatherData] = useState([]);
  const [selectedCapital, setSelectedCapital] = useState('Helsinki');
  const [weatherImageUrl, setWeatherImageUrl] = useState('https://openweathermap.org/img/wn/11d@2x.png')

  const handleFilter = (event) => {
    setFilterName(event.target.value);
  };

  const toggleVisibility = (id) => {
    setVisibleItems((prev) => ({
      ...prev,
      [id]: !prev[id], 
    }));
  };

  useEffect(() => {
    countryService
      .getAllCountries()
      .then((response) => {
        setCountries(response.data); 
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    countryService
    .getWeatherData(selectedCapital)
    .then((response) => {
      setWeatherData(response.data);
    })

    if (weatherData.cod !== 200){
      setWeatherImageUrl("https://openweathermap.org/img/wn/01d.png");
    } else {
      setWeatherImageUrl("https://openweathermap.org/img/wn/11d@2x.png");
    }

    console.log(weatherData)
    console.log(weatherData.cod)
    console.log(typeof weatherData.cod)
    console.log(weatherData.cod !== 200)
  }, [selectedCapital]);

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filterName.toLowerCase())
  );

  if (filteredCountries.length > 10) {
    return (
      <div>
        filter countries &nbsp; <input onChange={handleFilter}></input>
        <ul>Too many matches, specify another filter.</ul>
      </div>
    );
  } else if (filteredCountries.length < 10 && filteredCountries.length > 1) {
    return (
      <div>
        filter countries &nbsp; <input onChange={handleFilter}></input>
        {filteredCountries.map((country, i) => (
          <li key={i}>
            {country.name.common}
            <button onClick={() => toggleVisibility(i)}>show</button>
            {visibleItems[i] && (
              <div>
                <h2>{country.name.common}</h2>
                Capital: {country.capital}
                <br />
                Area: {country.area}
                <h3>languages</h3>
                <ul>
                  {Object.values(country.languages).map((language) => (
                    <li key={language}>{language}</li>
                  ))}
                </ul>
                <img src={country.flags.png} />
              </div>
            )}
          </li>
        ))}
      </div>
    );
  } else if (filteredCountries.length === 1) {
    return (
      <div>
        find countries &nbsp; <input onChange={handleFilter}></input>
        {filteredCountries.map((country) => (
          <div>
            <h2>{country.name.common}</h2>
            Capital: {country.capital}
            <br />
            Area: {country.area}
            <h3>languages</h3>
            <ul>
              {Object.values(country.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
            </ul>
            <img src={country.flags.png} />
            <h3>weather</h3>
            <button onClick={() => setSelectedCapital(country.capital)}>Refresh weather</button>
            {weatherData && weatherData.main && <p>temperature: {weatherData.main.temp}</p>}
            {weatherData && weatherData.wind && <p>wind: {weatherData.wind.speed}</p>}
            <img src={weatherImageUrl} />
          </div>
        ))}
      </div>
    );
  }
};

export default App;
