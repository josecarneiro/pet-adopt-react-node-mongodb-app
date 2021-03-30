'use strict';

const express = require('express');
const User = require('./../models/user');
const Pet = require('./../models/pet');

const router = new express.Router();

router.get('/:id', async (req, res, next) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    const pets = await Pet.find({ shelter: id });
    res.json({ shelter: user, pets });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
