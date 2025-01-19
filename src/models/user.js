import mongoose from "mongoose";
const { model, Schema } = mongoose
const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
})
const User = model("User", userSchema)
export {
    User,
    userSchema,
}