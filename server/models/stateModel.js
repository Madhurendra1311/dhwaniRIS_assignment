const mongoose = require('mongoose')

const stateSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
    },
    stateName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },
    district:
        [
            {
                district_name: {
                    type: String,
                    required: true,
                    min: 4,
                    max: 255
                }
            }
        ]
})

module.exports = mongoose.model('State', stateSchema)