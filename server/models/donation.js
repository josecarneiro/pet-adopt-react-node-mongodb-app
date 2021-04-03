'use strict';

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema(
  {
    shelter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    individual: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    amount: {
      type: Number,
      min: 0,
      required: true
    },
    currency: {
      type: String,
      enum: ['EUR', 'USD'],
      required: true
    },
    paymentId: {
      type: String,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'addedDate',
      updatedAt: 'editDate'
    }
  }
);

module.exports = mongoose.model('Donation', donationSchema);
