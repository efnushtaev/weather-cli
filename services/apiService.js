import axios from "axios";
import { getKeyValue, DICTIONARY } from "./storageService.js";

const getWeather = async () => {
  const token = process.env.token || (await getKeyValue(DICTIONARY.token));
  const lat = process.env.lat || (await getKeyValue(DICTIONARY.lat));
  const lon = process.env.lon || (await getKeyValue(DICTIONARY.lon));

  if (!token) {
    throw "Не задан ключ API, задайте его через команду -t [API_KEY]";
  }

  if (!lat || !lon) {
    throw "Не задан город, задайте его через команду  -с [CITY]";
  }

  const { data } = await axios.get(
    "https://api.openweathermap.org/data/2.5/weather",
    {
      params: {
        lat,
        lon,
        appid: token,
        lang: "ru",
        units: "metric",
      },
    }
  );

  return data;
};

const getCoords = async (c) => {
  const city = process.env.city || (c);
  const token = process.env.token || (await getKeyValue(DICTIONARY.token));

  if (!token) {
    throw "Не задан ключ API, задайте его через команду -t [API_KEY]";
  }

  if (!city) {
    throw "Не задан город, задайте его через команду  -с [CITY]";
  }

  const { data } = await axios.get(
    "http://api.openweathermap.org/geo/1.0/direct",
    {
      params: {
        q: city,
        limit: 1,
        appid: token,
      },
    }
  );

  return data
};

export { getWeather, getCoords };
