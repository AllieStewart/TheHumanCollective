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
        required: false,
        trim: true,
    },
    cityText: {
        type: String,
        required: true,
        trim: true,
    },
    latitude: {
        type: Number,
        required: true,
        min: -90,
        max: 90,
    },
    longitude: {
        type: Number,
        required: true,
        min: -180,
        max: 180,
    },
    placeName: {
        type: String,
        required: false,
        trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
    }
});

const Geolocation = model('Geolocation', geolocationSchema);

module.exports = Geolocation;
// End of JS file