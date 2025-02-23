import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: {
        type: String,
        minLength: [3, `min password 3`]
    },
    phone: String,
    verificationOtp: { type: String, default: `` },
    verificationOtpExpireAt: { type: Number, default: 0 },
    isVarified: { type: Boolean, default: false },
    resetOtp: { type: String, default: `` },
    resetOtpExpireAt: { type: Number, default: 0 },
    isAdmin: { type: Boolean, default: false },
    isUser: { type: Boolean, default: true },
    isNgo: { type: Boolean, default: false },
    isDonor: { type: Boolean, default: false },
    isBanned: { type: Boolean, default: false },
    roletype: { type: String, default: `` },
    teamMember: { type: String, default: `` },
    ngoRegNum: { type: String, default: `` },
    area: { type: String, default: `` },
    donatedFoods: [{ type: mongoose.Schema.Types.ObjectId, ref: "foods" }],  // <-- Added field
    createdAt: { type: Date, default: Date.now },
});

const usermodel = mongoose.models.users || mongoose.model("users", userSchema);
export default usermodel;
