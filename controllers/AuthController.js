const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel, CounterModel } = require("../models/User");

const AdminModel = require("../models/Admin");

//counter
const initializeCounter = async () => {
  try {
    const existingCounter = await CounterModel.findOne({ key: "userId" });
    if (!existingCounter) {
      await CounterModel.create({ key: "userId", value: 1000 });
      console.log("Counter initialized with value 1000");
    } else if (existingCounter.value < 1000) {
      // Reset the value if it's less than 1000
      existingCounter.value = 1000;
      await existingCounter.save();
      console.log("Counter reset to value 1000");
    } else {
      console.log("Counter already exists with value:", existingCounter.value);
    }
  } catch (error) {
    console.error("Error initializing counter:", error);
  }
};

//signup
const signup = async (req, res) => {
  try {
    const {
      fullName,
      phoneNumber,
      email,
      password,
      confirmPassword,
      userType,
    } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }
    const user = await UserModel.findOne({ $or: [{ email }, { phoneNumber }] });
    if (user) {
      return res.status(409).json({
        message: "User is already exist, you can login",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    //user Id Update
    const allUsers = await UserModel.find().sort({ userId: 1 });
    let userId = 1001;
    for (const u of allUsers) {
      if (u.userId === userId) {
        userId++;
      } else {
        break;
      }
    }

    const counter = await CounterModel.findOne({ key: "userId" });
    if (!allUsers.some((u) => u.userId === counter.value)) {
      counter.value = userId + 1; // Set to the next ID
      await counter.save();
    }

    if (userType === "user") {
      const newUser = new UserModel({
        fullName,
        phoneNumber,
        email,
        password: hashedPassword,
        userId,
      });
      await newUser.save();
      return res
        .status(201)
        .json({ message: "User registered successfully", success: true });
    } else if (userType === "admin") {
      const newAdmin = new AdminModel({
        fullName,
        phoneNumber,
        email,
        password: hashedPassword,
      });

      await newAdmin.save();
      return res
        .status(201)
        .json({ message: "Admin registered successfully", success: true });
    } else {
      return res.status(400).json({ message: "Invalid user type" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal server errror",
      success: false,
    });
  }
};

// login

const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    let user = await UserModel.findOne({
      $or: [{ email: identifier }, { phoneNumber: identifier }],
    });
    console.log("User found:", user);
    if (!user) {
      user = await AdminModel.findOne({
        $or: [{ email: identifier }, { phoneNumber: identifier }],
      });
    }
    const errorMsg = ` User or Admin not found not found`;
    if (!user) {
      return res.status(404).json({ message: errorMsg, success: false });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Auth failed email or password is wrong ",
        success: false,
      });
    }

    const userType = user instanceof UserModel ? "user" : "admin";

    const token = jwt.sign({ id: user._id, userType }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      user,
      userType
      // user: {
      //   id: user._id,
      //   name: user.name,
      //   email: user.email,
      //   userType,
      // },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = { signup, initializeCounter, login };
