const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const city = new Schema({
  id: {
    type: Number
  },
  country: {
    type: String
  },
  name: {
    type: String
  },
  coord: {
    lon: {
      type: Number
    },
    lat: {
      type: Number
    }
  }
});

const City = mongoose.model('City', city, 'city');

module.exports = {
  City
};
