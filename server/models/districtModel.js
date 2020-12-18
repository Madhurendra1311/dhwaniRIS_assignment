const mongoose = require('mongoose')

const districtSchema = new mongoose.Schema({
    districtName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    }
})

module.exports = mongoose.model('District', districtSchema)