const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema =new schema({
    fullName:{ type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    userId: { type: Number, unique: true },
},{ timestamps: true });

const CounterSchema = new mongoose.Schema({
    key: { type: String, required: true, unique: true },
    value: { type: Number, required: true },
});

const UserModel = mongoose.model('User',UserSchema)
const CounterModel = mongoose.model('Counter',CounterSchema)
module.exports = {UserModel,CounterModel};
