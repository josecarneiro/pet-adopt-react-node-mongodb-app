'use strict';

const express = require('express');
const mongoose = require('mongoose');

const User = require('./../models/user');
const Pet = require('./../models/pet');
const Donation = require('./../models/donation');

const routeGuard = require('./../middleware/route-guard');
const processPayment = require('./../utilities/process-payment');

const router = new express.Router();

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const shelter = await User.findById(id);
    const pets = await Pet.find({ shelter: id });
    const aggregateDonations = await Donation.aggregate([
      { $match: { shelter: mongoose.Types.ObjectId(id) } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    const donations = aggregateDonations.length && aggregateDonations[0].total;
    res.json({ shelter, pets, donations });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/donate', routeGuard, async (req, res, next) => {
  const id = req.params.id;
  const { token, amount, currency } = req.body;
  try {
    const payment = await processPayment({
      token,
      amount: Math.floor(amount * 100),
      currency
    });
    const donation = await Donation.create({
      shelter: id,
      individual: req.user._id,
      amount,
      currency,
      paymentId: payment.id
    });
    res.json({ donation });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
