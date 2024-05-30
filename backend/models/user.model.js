import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    googleId: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'], 
    }
});

export const User = mongoose.model("User", userSchema);