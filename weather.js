#!/usr/bin/env node

import { getArgs } from "./helpers/args.js";
import { getBeautyWeather } from "./helpers/getBeautyWeather.js";
import { getCoords, getWeather } from "./services/apiService.js";
import { printHelp, printSuccess, printError } from "./services/logService.js";
import {
  saveKeyValue,
  getKeyValue,
  DICTIONARY,
} from "./services/storageService.js";

const SPB_COORDINATES = {
  lat: "59.867160",
  lon: "30.469465",
};

const saveToken = async (token) => {
  if (!token.length) {
    printError("Не передан токен");
    return;
  }
  try {
    await saveKeyValue(DICTIONARY.token, token);
    printSuccess("Токен сохранен");
  } catch (e) {
    printError(e.message);
  }
};

const saveCity = async (city) => {
  if (!city.length) {
    printError("Город не указан");
    return;
  }
  try {
    const [coords] = await getCoords(city);
    if (coords) {
      await saveKeyValue(DICTIONARY.city, coords.name);
      await saveKeyValue(DICTIONARY.lat, coords.lat);
      await saveKeyValue(DICTIONARY.lon, coords.lon);
      printSuccess("Город сохранен");
    }
  } catch (e) {
    printError(e);
  }
};

const getForecast = async () => {
  try {
    const data = await getWeather();
    const { weather, main, wind } = data;
    const city = await getKeyValue(DICTIONARY.city);

    getBeautyWeather(
      city,
      weather[0]?.description,
      main?.temp,
      main?.feels_like,
      wind?.speed
    );
  } catch (e) {
    if (e?.response?.status == 400) {
      printError("Неверно указан город");
    } else if (e?.response?.status == 401) {
      printError("Неверно указан токен");
    } else {
      printError(e);
    }
  }
};

const initCLI = () => {
  const args = getArgs(process.argv);

  if (args.h) {
    printHelp();
    return;
  }

  if (args.t) {
    return saveToken(args.t);
  }

  if (args.c) {
    return saveCity(args.c);
  }

  getForecast();
};

initCLI();
