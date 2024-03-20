// Start of JS file
// Geolocation schema for Geolocation model.
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const geolocationSchema = new Schema({
    countryText: {
        type: String,
        required: true,
        trim: true,
    },
    stateText: {
        type: String,
        required: true,
        trim: true,
    },
    cityText: {
        type: String,
        required: true,
        trim: true,
    },
    latitude: {
        type: String,
        required: true,
        trim: true,
    },
    longitude: {
        type: String,
        required: true,
        trim: true,
    },
    timezone: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

const Geolocation = model('Geolocation', geolocationSchema);

module.exports = Geolocation;
// End of JS file