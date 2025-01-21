const mongoose=require("mongoose");
const schema = mongoose.Schema;

const adminSchema=new schema({
    fullName:{ type: String, required: true },
    phoneNumber: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
},{ timestamps: true });

const AdminModel =mongoose.model("Admin",adminSchema)
module.exports = AdminModel;