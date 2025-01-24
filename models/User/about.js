const mongoose = require("mongoose");
const schema = mongoose.Schema;

const aboutSchema = new schema(
  {
    id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "UserModel",
      unique: true,
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
        religion: { type: String, required: true },
        caste: { type: String, required: true },
        subcaste: { type: String },
        nakshatra: { type: String },
        rashi: { type: String, required: true },
        gotra: { type: String },
      },
    ],
    eduction: [
      {
        qualification: { type: String, required: true },
        occupation: { type: String, required: true },
        incomeperannum: { type: String, required: true },
        occupationcountry: { type: String, required: true },
      },
    ],
    photo: [
      {
        image: { type: String },
      },
    ],
    lifestyle: [
      {
        drink: { type: String, required: true },
        smoke: { type: String, required: true },
        diet: { type: String, required: true },
        blood: { type: String, required: true },
        bodytype: { type: String },
        skintype: { type: String },
      },
    ],
    preference: [
      {
        castepreference: { type: String, required: true },
        agepreferencefrom: { type: String, required: true },
        heightpreferencefrom: { type: String, required: true },
        occupationcountrypreference: { type: String, required: true },
        educationpreference: { type: String,required: true },
        agepreferenceto: { type: String,required: true },
        heightpreferenceto: { type: String,required: true },
        maritalStatuspreference: { type: String,required: true },
      },
    ],
    others: [
      {
        bio: { type: String, required: true },
      },
    ],
  },
  { timestamps: true }
);

const AboutModel = mongoose.model("About", aboutSchema);
module.exports = AboutModel;
