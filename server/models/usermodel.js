import mongoose from "mongoose";
import validator from "validator";
const bdPhoneRegex = /^(?:\+8801|01)[3-9]\d{8}$/;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: validator.isEmail,
            message: "Invalid email format",
        },
    },
    password: {
        type: String,
        minLength: [3, "Min password length is 3"],
    },
    phone: {
        type: String,
        required: [true, "Phone number is required"],
        unique: true,
        trim: true,
        match: [bdPhoneRegex, "Invalid phone number"],
    },
    address: String,
    verificationOtp: { type: String, default: "" },
    verificationOtpExpireAt: { type: Number, default: 0 },
    isVarified: { type: Boolean, default: false },
    resetOtp: { type: String, default: "" },
    resetOtpExpireAt: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    isUser: { type: Boolean, default: true },
    isNgo: { type: Boolean, default: false },
    isDonor: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    roletype: { type: String, default: "" },
    teamMember: { type: String, default: "" },
    ngoRegNum: { type: String, default: "" },
    area: { type: String, default: "" },
    image: { type: String },
    donatedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "foods" }],
    saleFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "sellfoods" }],
    createdAt: { type: Date, default: Date.now },
});

const usermodel = mongoose.models.users || mongoose.model("users", userSchema);
export default usermodel;
