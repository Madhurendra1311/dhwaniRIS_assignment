const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    stateName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    district : [
        {
            districtName: {
                type : String,
                required: true,
                min: 3,
                max: 255
            }
        }
    ]
})

module.exports = mongoose.model('State', stateSchema)