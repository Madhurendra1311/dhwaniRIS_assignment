const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        min: 6,
        max: 255,
    },
    username: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        max: 255,
        min: 6,
    },
    mobile: {
        type: Number,
        required: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        min: 6,
    },
    token: {
        type: String,
        required: false,
        max: 1024,
        min: 6,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('User', userSchema)