const bcrypt = require("bcrypt");
// const twilio = require("twilio");
const nodemailer = require("nodemailer");
const { generateOTP, storeOTP, verifyOTP } = require("../utils/otpService");
const { UserModel } = require("../models/User");
const AdminModel = require("../models/Admin");


//for mobile  sms otp
// const twilioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
// const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER;

// const sendSMS = async (phoneNumber, otp) => {
//   try {
//     await twilioClient.messages.create({
//       body: `Your OTP is: ${otp}. Please do not share this OTP with anyone. This message is from Girija Kalyana.`,
//       from: TWILIO_PHONE_NUMBER,
//        to: phoneNumber,
     
//     });
//     console.log("OTP sent via SMS");
//   } catch (error) {
//     console.error("Error sending SMS:", error);
//   }
// };

//for mail otp
const sendEmail = async (email, otp) => {
    const transporter = nodemailer.createTransport({
      service: "gmail", // or any email service provider
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  
    const mailOptions = {
      from: `"Girija Kalyana" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP for Password Reset",
      text: `Your OTP is: ${otp}. Please do not share this OTP with anyone. This message is from Girija Kalyana.`,
    };
    try {
      await transporter.sendMail(mailOptions);
      console.log("OTP sent to email");
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  

  const forgotPassword = async (req, res) => {
    try {
      const { identifier } = req.body;
      let user = await UserModel.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      });
  
      if (!user) {
        user = await AdminModel.findOne({
          $or: [{ email: identifier }, { phoneNumber: identifier }],
        });
      }
  
      if (!user) {
        return res.status(404).json({
          message: "User or Admin not found",
          success: false,
        });
      }
  
      const otp = generateOTP();
      storeOTP(identifier, otp); // Store OTP in memory for validation
  
      // Send OTP to the user's email or phone 
      if (user.email) {
        await sendEmail(user.email, otp);
      }
      // if (user.phoneNumber) {
      //   await sendSMS(user.phoneNumber, otp);
      // }
  
      console.log(`OTP sent to ${identifier}: ${otp}`);
  
      return res.status(200).json({
        message: "OTP sent successfully",
        success: true,
      });
    } catch (error) {
      console.error("Error in forgotPassword:", error);
      return res.status(500).json({
        message: "Internal server error",
        success: false,
      });
    }
  };

const resetPassword = async (req, res) => {
  try {
    const { identifier, otp, newPassword, confirmPassword } = req.body;

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const isOtpValid = verifyOTP(identifier, otp);
    if (!isOtpValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    let user = await UserModel.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });

    if (!user) {
      user = await AdminModel.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      });
    }

    if (!user) {
      return res.status(404).json({
        message: "User or Admin not found",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    return res.status(200).json({
      message: "Password reset successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { forgotPassword, resetPassword };
