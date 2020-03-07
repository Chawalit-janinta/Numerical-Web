const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const eqSchema = new Schema({
    equation: {
        type: String,
    },
    xl: {
        type: String,
    },
    xr: {
        type: String,
    },
});

const User = mongoose.model('falseposition', eqSchema);

module.exports = User;