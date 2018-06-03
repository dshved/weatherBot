const axios = require("axios");
const moment = require("moment");
const TOKEN = require("../config").OPENWEATHERMAP.TOKEN;
const BASE_URL = "http://api.openweathermap.org/data/2.5/";

const {
  getWeatherIcon,
  capitalizeFirstLetter,
  getWindDirectionName,
  getWindSpeedName,
} = require("./utils");

const getCurrentWeather = async (lat, lon, lang = "en", units = "metric") => {
  const { data } = await axios.get(
    `${BASE_URL}weather?lat=${lat}&lon=${lon}&APPID=${TOKEN}&lang=${lang}&units=${units}`,
  );

  const {
    name,
    dt,
    main: { temp, humidity, temp_min, temp_max },
    wind,
    clouds,
    weather,
  } = data;

  const date = moment.unix(dt).format("DD/MM, dddd");
  const weatherIcon = getWeatherIcon(weather[0].icon);
  const message = `_${name}_ ${date}
${parseInt(temp)}°C ${weatherIcon} ${capitalizeFirstLetter(
    weather[0].description,
  )}
${getWindSpeedName(wind.speed)}, ${wind.speed}m/s, ${getWindDirectionName(
    wind.deg,
  )}
Humidity ${humidity}%`;
  return message;
};

const getTemperature = ({
  weather,
  dt,
  temp,
  speed,
  deg,
  clouds,
  humidity,
}) => {
  const date = moment.unix(dt).format("DD/MM, dddd");
  const weatherIcon = getWeatherIcon(weather[0].icon);
  return `*${date}* ${weatherIcon} ${capitalizeFirstLetter(
    weather[0].description,
  )} 
${getWindSpeedName(speed)}, ${speed}m/s, ${getWindDirectionName(deg)}
Humidity ${humidity}%

_Morning_: ${parseInt(temp.morn)}°C
_Day_: ${parseInt(temp.day)}°C
_Evning_: ${parseInt(temp.eve)}°C
_Night_: ${parseInt(temp.night)}°C\n
`;
};

const getForecastWeather = async (
  lat,
  lon,
  countDays = 1,
  lang = "en",
  units = "metric",
) => {
  const { data } = await axios.get(
    `${BASE_URL}forecast/daily?lat=${lat}&lon=${lon}&APPID=${TOKEN}&lang=${lang}&units=${units}&cnt=${countDays}`,
  );
  let message = `_${data.city.name}_\n`;
  if (countDays == 2) {
    message += getTemperature(data.list[1]);
  } else {
    data.list.map(item => {
      message += getTemperature(item);
    });
  }
  return message;
};

const getWeatherTime = ({
  dt,
  main: { temp, humidity },
  weather,
  clouds,
  wind: { speed, deg },
}) => {
  const weatherIcon = getWeatherIcon(weather[0].icon);
  const date = moment.unix(dt).format("DD/MM, HH:mm");

  return `*${date}*  ${parseInt(temp)}°C ${weatherIcon} ${capitalizeFirstLetter(
    weather[0].description,
  )}
${getWindSpeedName(speed)}, ${speed}m/s, ${getWindDirectionName(deg)}
Humidity ${humidity}%

`;
};

const getWeatherDetail = async (
  lat,
  lon,
  cnt = 9,
  lang = "en",
  units = "metric",
) => {
  const { data } = await axios.get(
    `${BASE_URL}forecast/?lat=${lat}&lon=${lon}&APPID=${TOKEN}&lang=${lang}&units=${units}&cnt=${cnt}`,
  );

  let message = "";
  data.list.map(item => {
    message += getWeatherTime(item);
  });
  return message;
};

module.exports = {
  getCurrentWeather,
  getForecastWeather,
  getWeatherDetail,
};
