module.exports = {
  default_keyboard: {
    parse_mode: "Markdown",
    reply_markup: {
      keyboard: [
        [
          {
            text: "Today",
          },
          {
            text: "Tomorrow",
          },
        ],
        [
          {
            text: "Forecast",
          },
          {
            text: "Settings",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },
  more_keyboard: {
    parse_mode: "Markdown",
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "more",
            callback_data: "more",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },
  location_keyboard: {
    reply_markup: {
      keyboard: [
        [
          {
            text: "Change location",
          },
        ],
        [
          {
            text: "Back",
          },
        ],
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
    },
  },
};
