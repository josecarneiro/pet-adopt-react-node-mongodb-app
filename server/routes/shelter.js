'use strict';

const express = require('express');
const User = require('./../models/user');
const Pet = require('./../models/pet');
const Donation = require('./../models/donation');

const processPayment = require('./../utilities/process-payment');

const router = new express.Router();

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const shelter = await User.findById(id);
    const pets = await Pet.find({ shelter: id });
    const donations = await Donation.find({ shelter: id });
    const donationsAmount = donations.reduce(
      (total, donation) => total + donation.amount,
      0
    );
    // const donations = await Donation.aggregate([
    //   { $match: { shelter: id } },
    //   { $group: { _id: null, amount: { $sum: '$amount' } } }
    // ]);
    // console.log(donations);
    res.json({ shelter, pets, donations: donationsAmount });
  } catch (error) {
    next(error);
  }
});

router.post('/:id/donate', async (req, res, next) => {
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
