// Start of JS file
// Log schema and Comments schema for Log model.
const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const logSchema = new Schema({
  logText: {
    type: String,
    required: 'Enter your travel log!',
    minlength: 1,
    maxlength: 280,
    trim: true,
  },
  logAuthor: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  comments: [
    {
      commentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },
      commentAuthor: {
        type: String,
        required: true,
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (timestamp) => dateFormat(timestamp),
      },
    },
  ],
});

const Log = model('Log', logSchema);

module.exports = Log;
// End of JS file