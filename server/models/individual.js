'use strict';

const mongoose = require('mongoose');
const User = require('./user');
const { PET_SPECIES, PET_SIZES, PET_QUALITIES } = require('./common');

const individualSchema = new mongoose.Schema({
  preferences: {
    species: {
      type: [String],
      enum: PET_SPECIES
    },
    sizes: {
      type: [String],
      enum: PET_SIZES
    },
    qualities: {
      type: [String],
      enum: PET_QUALITIES
    },
    sterilized: {
      type: Boolean
    }
  }
});

const Individual = User.discriminator('individual', individualSchema);

module.exports = Individual;
