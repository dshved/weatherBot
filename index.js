const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const mongoose = require("mongoose");
const { City, User } = require("./models");

const {
  getForecastWeather,
  getCurrentWeather,
  getWeatherDetail,
} = require("./utils/api");

const {
  BOT: { TOKEN },
  DB: { PATH },
} = require("./config");

const bot = new TelegramBot(TOKEN, {
  polling: true,
});

mongoose.Promise = global.Promise;
mongoose.connect(PATH);

const {
  default_keyboard,
  more_keyboard,
  location_keyboard,
} = require("./utils/keyboards");

bot.on("location", msg => {
  User.findOneAndUpdate(
    {
      id: msg.from.id,
    },
    {
      location: {
        lat: msg.location.latitude,
        lon: msg.location.longitude,
      },
    },
  ).then();
  const chatId = msg.chat.id;
  const message =
    "Settings successfully saved. What is the weather for you to show?";
  bot.sendMessage(chatId, message, default_keyboard);
});

bot.onText(/\/start/, (msg, match) => {
  if (msg.text !== "/start") return;
  User.findOne(
    {
      id: msg.from.id,
    },
    (err, res) => {
      if (err) return;
      if (!res) {
        const newUser = new User({
          id: msg.from.id,
          first_name: msg.from.first_name,
          last_name: msg.from.last_name,
          language_code: msg.from.language_code,
        });
        newUser.save();
      }
    },
  );
  const chatId = msg.chat.id;
  const message = "Send me your geolocation";
  bot.sendMessage(chatId, message);
});

bot.onText(/Today|today|\/today/, async (msg, match) => {
  if (msg.text !== "Today" && msg.text !== "today" && msg.text !== "/today")
    return;
  const chatId = msg.chat.id;
  const {
    location: { lat, lon },
  } = await User.findOne({
    id: msg.from.id,
  });
  const message = await getCurrentWeather(lat, lon, "en", "metric");
  bot.sendMessage(chatId, message, more_keyboard);
});

bot.onText(/Tomorrow|tomorrow|\/tomorrow/, async (msg, match) => {
  const chatId = msg.chat.id;
  const {
    location: { lat, lon },
  } = await User.findOne({
    id: msg.from.id,
  });
  const message = await getForecastWeather(lat, lon, 2, "en", "metric");
  bot.sendMessage(chatId, message, default_keyboard);
});

bot.onText(/Forecast|forecast|\/forecast/, async (msg, match) => {
  const chatId = msg.chat.id;
  const {
    location: { lat, lon },
  } = await User.findOne({
    id: msg.from.id,
  });
  const message = await getForecastWeather(lat, lon, 5, "en", "metric");
  bot.sendMessage(chatId, message, default_keyboard);
});

bot.onText(/Settings|settings|\/settings/, async (msg, match) => {
  if (
    msg.text !== "Settings" &&
    msg.text !== "settings" &&
    msg.text !== "/settings"
  )
    return;
  const chatId = msg.chat.id;
  const message = "Select what you want to change";
  bot.sendMessage(chatId, message, location_keyboard);
});
bot.onText(/Change location|change location/, async (msg, match) => {
  if (msg.text !== "Change location" && msg.text !== "change location") return;
  const chatId = msg.chat.id;
  const message = "Send me your geolocation";
  bot.sendMessage(chatId, message);
});

bot.onText(/Back/, async (msg, match) => {
  if (msg.text !== "Back" && msg.text !== "Back") return;
  const chatId = msg.chat.id;
  const message = "What is the weather for you to show?";
  bot.sendMessage(chatId, message, default_keyboard);
});

bot.on("callback_query", async callbackQuery => {
  const action = callbackQuery.data;
  const msg = callbackQuery.message;
  const opts = {
    chat_id: msg.chat.id,
    message_id: msg.message_id,
    parse_mode: "Markdown",
  };
  if (action === "more") {
    const {
      location: { lat, lon },
    } = await User.findOne({
      id: msg.chat.id,
    });
    const message = await getWeatherDetail(lat, lon, 9, "en", "metric");
    bot.editMessageText(message, opts);
  }
});
