import mongoose, { models } from "mongoose";


const UserInfoSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    city: { type: String },
    postalCode: { type: String },
    country: { type: String },
    streetAddress: { type: String },
    admin: { type: Boolean, default: false },
    phone: { type: String },
}, { timestamps: true })



export const UserInfo = models?.UserInfo || mongoose.model("UserInfo", UserInfoSchema);


