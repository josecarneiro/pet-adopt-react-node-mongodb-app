'use strict';

const { Router } = require('express');

const bcryptjs = require('bcryptjs');
const Individual = require('./../models/individual');
const Shelter = require('./../models/shelter');
const User = require('./../models/user');

const router = new Router();

router.post('/sign-up', async (req, res, next) => {
  const { name, email, password, role } = req.body;
  try {
    const hash = await bcryptjs.hash(password, 10);
    const user = await User.create({
      name,
      email,
      passwordHashAndSalt: hash,
      role
    });
    req.session.userId = user._id;
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

router.post('/sign-in', (req, res, next) => {
  let user;
  const { email, password } = req.body;
  User.findOne({ email })
    .then((document) => {
      if (!document) {
        return Promise.reject(new Error("There's no user with that email."));
      } else {
        user = document;
        return bcryptjs.compare(password, user.passwordHashAndSalt);
      }
    })
    .then((result) => {
      if (result) {
        req.session.userId = user._id;
        res.json({ user });
      } else {
        return Promise.reject(new Error('Wrong password.'));
      }
    })
    .catch((error) => {
      next(error);
    });
});

router.post('/sign-out', (req, res, next) => {
  req.session.destroy();
  res.json({});
});

router.get('/verify', (req, res) => {
  const user = req.user || null;
  res.json({ user: user });
});

module.exports = router;
