const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eqSchema = new Schema({
  A: {
    type: Array,
  },
  B: {
    type: Array,
  },
  X: {
    type: Array,
  },
  size: {
    type: String,
  },
});

const User = mongoose.model('gaussseidel', eqSchema);

module.exports = User;