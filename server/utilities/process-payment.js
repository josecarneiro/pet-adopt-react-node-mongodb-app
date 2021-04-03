'use strict';

const stripe = require('stripe');
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

const paymentProcessor = stripe(stripeSecretKey);

const processPayment = async ({ token, amount, currency }) => {
  const payment = await paymentProcessor.paymentIntents.create({
    amount,
    currency,
    payment_method: token,
    confirm: true,
    error_on_requires_action: true
  });
  return payment;
};

module.exports = processPayment;
