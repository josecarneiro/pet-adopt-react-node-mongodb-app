'use strict';

const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    pet: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Pet'
    }
  },
  {
    timestamps: {
      createdAt: 'addedDate',
      updatedAt: 'editDate'
    }
  }
);

module.exports = mongoose.model('Application', applicationSchema);
