'use strict';

const mongoose = require('mongoose');
const {
  PET_SPECIES,
  PET_SIZES,
  PET_GENDERS,
  PET_QUALITIES
} = require('./common');

const petSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  shelter: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  species: {
    type: String,
    enum: PET_SPECIES,
    required: true
  },
  breed: {
    type: String
  },
  age: {
    type: Number
  },
  size: {
    type: String,
    enum: PET_SIZES
  },
  gender: {
    type: String,
    enum: PET_GENDERS
  },
  qualities: {
    type: [String],
    enum: PET_QUALITIES
  },
  steralized: {
    type: Boolean,
    required: true
  },
  conditions: {
    type: [String]
  },
  description: {
    type: String
  },
  pictures: {
    type: [String]
  }
});

module.exports = mongoose.model('Pet', petSchema);
