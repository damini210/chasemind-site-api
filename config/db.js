const mongoose = require('mongoose');
const config = require('./config');


const connectDB = async () => {
  try {
    await mongoose.connect(config.mongodb.uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('Connection error', err);
    process.exit(1);
  }
};

module.exports = connectDB;
