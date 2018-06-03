const getWeatherIcon = icon => {
  const icons = {
    "01d": "🌞",
    "01n": "🌚",
    "02d": "🌤",
    "02n": "🌚",
    "03d": "☁️",
    "03n": "☁️",
    "04d": "☁️",
    "04n": "☁️",
    "09d": "🌧",
    "09n": "🌧",
    "10d": "🌦",
    "10n": "🌧",
    "11d": "⚡️",
    "11n": "⚡️",
    "13d": "❄",
    "13n": "❄",
    "50d": "🌫",
    "50n": "🌫"
  };
  return icons[icon];
};

const capitalizeFirstLetter = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

const getWindDirectionName = degrees => {
  const windDirection = {
    "0.0": "North",
    "22.5": "North-Northeast",
    "45.0": "Northeast",
    "67.5": "East-Northeast",
    "90.0": "East",
    "112.5": "East-Southeast",
    "135.0": "Southeast",
    "157.5": "South-Southeast",
    "180.0": "South",
    "202.5": "South-Southwest",
    "225.0": "Southwest",
    "247.5": "West-Southwest",
    "270.0": "West",
    "292.5": "West-Northwest",
    "315.0": "Northwest",
    "337.5": "North-Northwest"
  };

  const entries = Object.entries(windDirection);
  let name;
  entries.map((item, index) => {
    let a = item[0] * 1;
    let b = entries[index + 1] ? entries[index + 1][0] * 1 : 100;
    if (degrees >= a && degrees <= b) {
      name = item[1];
    }
  });
  return name;
};

const getWindSpeedName = speed => {
  const windSpeed = {
    "0": "Calm",
    "0.3": "Light Air",
    "1.6": "Light Breeze",
    "3.4": "Gentle Breeze",
    "5.5": "Moderate Breeze",
    "8.0": "Fresh Breeze",
    "10.8": "strong Breeze",
    "13.9": "Near Gale",
    "17.2": "Gale",
    "20.8": "Severe Gale",
    "24.5": "Strong storm",
    "28.5": "Violent Storm",
    "32.7": "Hurricane"
  };
  const entries = Object.entries(windSpeed);
  let name;
  entries.map((item, index) => {
    let a = item[0] * 1;
    let b = entries[index + 1] ? entries[index + 1][0] * 1 : 100;
    if (speed >= a && speed <= b) {
      name = item[1];
    }
  });
  return name;
};

module.exports = {
  getWeatherIcon,
  capitalizeFirstLetter,
  getWindDirectionName,
  getWindSpeedName
};
