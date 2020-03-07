const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eqSchema = new Schema({
  equation: {
    type: String,
  },
});

const User = mongoose.model('graphical', eqSchema);

module.exports = User;