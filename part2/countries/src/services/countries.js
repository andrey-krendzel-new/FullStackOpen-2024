import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/";
const api_key = import.meta.env.VITE_SOME_KEY;

const getCountry = (name) => {
  const request = axios.get(`${baseUrl}/${name}`);
  return request;
};

const getAllCountries = () => {
  const request = axios.get(`${baseUrl}/all`);
  return request;
};

const getWeatherData = (city) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=` +
      city +
      `&appid=` +
      api_key
  );
  return request;
};

export default { getCountry, getAllCountries, getWeatherData };
