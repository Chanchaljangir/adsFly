"use strict";
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const Offers = mongoose.Schema({
    businessId: {
        type: Schema.Types.ObjectId,
        ref: 'BusinessForm'
    },
    title: String,
    subTitle: [{
        type: String
    }],
    description: String,
    subDescription: [{
        type: String
    }],
    imageUrl: String,
    offer: String,
    isActive: {
        type: Boolean,
        default: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isHide: {
        type: Boolean,
        default: false
    },
    rating: {
        totalRatingNo: String,
        averagerating: String
    }
})
const Offers = module.exports = mongoose.model("Offers", Offers);
