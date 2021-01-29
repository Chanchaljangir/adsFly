"use strict";
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const Subsciption = mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'signUp'
    },
    businessId: [{
        type: Schema.Types.ObjectId,
        ref: 'BusinessForm'
    }]
})
const Subsciption = module.exports = mongoose.model("Subsciption", Subsciption);
