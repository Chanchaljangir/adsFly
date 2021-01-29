"use strict";
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const SignUp = mongoose.Schema({
    name: String,
    mobile: {
        type: Number,
        required: [true, "Mobile Number is required"]
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        unique: true
    },
    alternetEmail: String,
    password: {
        type: String,
        required: [true, 'password is required']
    },
    gender: { type: String, enum: ["Male", "Female"] },
    location: String,
    occupation: String,
    companyName: String,
    mobile: {
        type: Number,
        required: [true, "Mobile Number is required"]
    },
    alternetMobile: String,
    profilePicUrl: String,
    category: String
})
const SignUp = module.exports = mongoose.model("SignUp", SignUp);
