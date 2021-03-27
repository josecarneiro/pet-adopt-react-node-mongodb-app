'use strict';

const mongoose = require('mongoose');
const User = require('./user');

const shelterSchema = new mongoose.Schema({
  address: {
    type: String
  },
  phoneNumber: {
    type: String
  }
});

const Shelter = User.discriminator('shelter', shelterSchema);

module.exports = Shelter;
