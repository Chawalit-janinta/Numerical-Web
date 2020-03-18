const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eqSchema = new Schema({
  X: {
    type: Array,
  },
  Y: {
    type: Array,
  },
  x_value: {
    type: String,
  },
  size: {
    type: String,
  },
});

const User = mongoose.model('newtondivide', eqSchema);

module.exports = User;