const mongoose = require("mongoose");
const schema = mongoose.Schema;

const aboutSchema = new schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
    },
    age: { type: Number, required: true },
    address: { type: String, required: true },
    pincode: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    height: { type: String, required: true },
    gender: { type: String, required: true },
    language: { type: String, required: true },
    maritalStatus: { type: String, required: true },
  },
  { timestamps: true }
);

const AboutModel = mongoose.model("About", aboutSchema);
module.exports = AboutModel;
