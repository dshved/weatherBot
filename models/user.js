const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const user = new Schema({
  id: {
    type: Number
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  language_code: {
    type: String
  },
  location: { lat: { type: Number }, lon: { type: Number } }
});

const User = mongoose.model('User', user);

module.exports = {
  User
};
