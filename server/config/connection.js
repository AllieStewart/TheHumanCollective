// Start of JS file
// Config file for connecting to MongoDB

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/hc-data');

const connectDB = async () => {
  try {
    console.log('Mongo URI: ', process.env.MONGO_DB_URI);
    await mongoose.connect(process.env.MONGO_DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log(`MongoDB Connected: ${mongoose.connection.host}`);
  } catch (err) {
    console.error(`Error: ${err.message}`);
    process.exit(1);
  }
};

connectDB();

module.exports = mongoose.connection;
// End of JS file