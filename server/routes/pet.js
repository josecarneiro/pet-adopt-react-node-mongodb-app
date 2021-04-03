'use strict';

const express = require('express');

const Pet = require('./../models/pet');
const User = require('./../models/user');
const Application = require('./../models/application');

const routeGuard = require('./../middleware/route-guard');
const fileUpload = require('./../middleware/file-upload');
const sendEmail = require('./../utilities/send-email');

const router = new express.Router();

router.post(
  '/',
  routeGuard,
  fileUpload.array('pictures', 10),
  async (req, res, next) => {
    const pictures = req.files.map((file) => file.path);
    const {
      name,
      species,
      breed,
      age,
      size,
      gender,
      qualities,
      sterilized,
      conditions,
      description
    } = req.body;
    try {
      const pet = await Pet.create({
        name,
        species,
        breed,
        age,
        size,
        gender,
        qualities,
        sterilized,
        conditions,
        description,
        shelter: req.user._id,
        pictures
      });
      res.json({ pet });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/list', async (req, res, next) => {
  try {
    const pets = await Pet.find().sort({ addedDate: -1 }).limit(20);
    res.json({ pets });
  } catch (error) {
    next(error);
  }
});

router.get('/random', routeGuard, async (req, res, next) => {
  const preferences = req.user.preferences;
  const filter = {
    species: preferences.species,
    size: preferences.sizes
  };
  if (preferences.qualities.length) {
    filter.qualities = { $in: preferences.qualities };
  }
  try {
    const total = await Pet.count(filter);
    const randomIndex = Math.floor(Math.random() * total);
    const pet = await Pet.findOne(filter).skip(randomIndex);
    res.json({ pet });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id).populate('shelter', 'name');
    let application = null;
    if (req.user) {
      application = await Application.findOne({
        pet: req.params.id,
        individual: req.user._id
      });
    }
    res.json({ pet, application });
  } catch (error) {
    next(error);
  }
});

// | PATCH | /pet/:id | Allows shelter user to edit pet | shelter | ❌ |
router.patch('/:id', async (req, res, next) => {
  // ...
});

router.delete('/:id', routeGuard, async (req, res, next) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({});
  } catch (error) {
    next(error);
  }
});

router.post('/:id/adopt', routeGuard, async (req, res, next) => {
  try {
    const application = await Application.create({
      individual: req.user._id,
      pet: req.params.id
    });
    const pet = await Pet.findById(req.params.id);
    const shelter = await User.findById(pet.shelter);
    await sendEmail({
      receiver: shelter.email,
      subject: `${req.user.name} applied to adopt ${pet.name}`,
      body: `
        <p>${req.user.name} applied to adopt ${pet.name}.</p>
        <p>${req.user.name}'s email is "${req.user.email}".</p>
      `
    });
    res.json({ application });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

module.exports = router;
