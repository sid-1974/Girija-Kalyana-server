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
    family: [
      {
        father: { type: String, required: true },
        mother: { type: String, required: true },
        sibling1: { type: String },
        sibling2: { type: String },
        religion: { type: String,required:true },
        caste: { type: String ,required:true },
        subcaste: { type: String },
        nakshatra: { type: String },
        rashi: { type: String,  required:true },
        gotra: { type: String },
      },
    ],
  },
  { timestamps: true }
);

const AboutModel = mongoose.model("About", aboutSchema);
module.exports = AboutModel;
