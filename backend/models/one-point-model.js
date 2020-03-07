const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eqSchema = new Schema({
    equation: {
        type: String,
    },
    x0: {
        type: String,
    },
});

const User = mongoose.model('onepoint', eqSchema);

module.exports = User;