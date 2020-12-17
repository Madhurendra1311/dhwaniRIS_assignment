const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const childProfile = new Schema({
    name: {
        type: String,
        required: true
    },
    sex: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
        trim: true, 
    },
    father_name: {
        type: String,
        required: true
    },
    mother_name: {
        type: String,
        required: true
    },
    district_id: {
        type: String, 
        required: true       
    },
    photo: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model("Profile", childProfile);