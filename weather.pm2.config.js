module.exports = {
  apps: [
    {
      name: "WeatherBot",
      script: "./index.js",
      watch: true,
      ignore_watch: ["node_modules"],
    },
  ],
};
