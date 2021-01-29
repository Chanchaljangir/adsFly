"use strict";
const mongoose = require('mongoose');
var bcrypt = require('bcryptjs');

const BusinessForm = mongoose.Schema({
  businessImageUrl: String,
  businessName: String,
  description: String,
  ownerOfBusiness: {
    type: Schema.Types.ObjectId,
    ref: 'signUp'
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: 'signUp'
  },
  galleryImageUrl: [{
    type: String
  }],
  otherCompanyPartnersip: [{
    type: String
  }],
  noOfWorkers: String,
  businessCategory: String,
  revenue: String,
  turnOver: String,
  startDate: String,
  businessPartners: [{
    imgUrl: String,
    linkes: [{
      type: String
    }]
  }],
  linkes: String,
  otherField: [{
    label: String,
    textValue: String
  }],
  isOffers: {
    type: Boolean,
    default: false
  },
  contact: [{
    officeAddress: String,
    mobile: String,
    country: String,
    state: String,
    city: String
  }]
})
const BusinessForm = module.exports = mongoose.model("BusinessForm", BusinessForm);

