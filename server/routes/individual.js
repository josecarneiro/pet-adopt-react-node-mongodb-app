'use strict';

const express = require('express');
const User = require('./../models/user');
const Individual = require('./../models/individual');
const routeGuard = require('./../middleware/route-guard');

const router = new express.Router();

router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    res.json({ individual: user });
  } catch (error) {
    next(error);
  }
});

router.patch('/preferences', routeGuard, async (req, res, next) => {
  const { species, sizes, qualities } = req.body;
  const id = req.user._id;
  try {
    const user = await Individual.findByIdAndUpdate(
      id,
      {
        $set: {
          role: 'individual',
          preferences: { species, sizes, qualities }
        }
      },
      { new: true }
    );
    res.json({ user });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
