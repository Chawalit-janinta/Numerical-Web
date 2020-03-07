const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eqSchema = new Schema({
  equation: {
    type: String,
  },
  x0: {
    type: String,
  },
  x1: {
    type: String,
  },
});

const User = mongoose.model('secant', eqSchema);

module.exports = User;