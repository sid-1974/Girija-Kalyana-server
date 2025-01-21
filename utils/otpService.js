const crypto = require("crypto");

let otpStore = {}; // Store OTP temporarily for validation

// Generate OTP
const generateOTP = (length = 6) => {
  const otp = crypto.randomInt(100000, 999999).toString(); // Simple 6-digit OTP
  return otp;
};

// Store OTP in memory (can be replaced with database or cache)
const storeOTP = (identifier, otp) => {
  otpStore[identifier] = otp;
  setTimeout(() => {
    delete otpStore[identifier]; // OTP expires after 3 minutes
  }, 3 * 60 * 1000);
};

// Verify OTP
const verifyOTP = (identifier, otp) => {
  if (otpStore[identifier] && otpStore[identifier] === otp) {
    delete otpStore[identifier]; // OTP is valid, remove it
    return true;
  }
  return false;
};

module.exports = { generateOTP, storeOTP, verifyOTP };
