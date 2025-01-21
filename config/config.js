// config.js
module.exports = {
    JWT_SECRET: process.env.JWT_SECRET || "sid123", // Replace with your secret
    OTP_EXPIRATION_TIME: 3* 60 * 1000, // OTP expiration time in ms (10 minutes)
  };
  