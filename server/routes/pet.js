'use strict';

const express = require('express');
const Pet = require('./../models/pet');
const fileUpload = require('./../middleware/file-upload');

const router = new express.Router();

router.post('/', fileUpload.array('pictures', 10), async (req, res, next) => {
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
});

router.get('/list', async (req, res, next) => {
  try {
    const pets = await Pet.find().sort({ addedDate: -1 }).limit(20);
    res.json({ pets });
  } catch (error) {
    next(error);
  }
});

router.get('/random', async (req, res, next) => {
  try {
    const total = await Pet.count();
    const randomIndex = Math.floor(Math.random() * total);
    const pet = await Pet.findOne().skip(randomIndex);
    res.json({ pet });
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id);
    res.json({ pet });
  } catch (error) {
    next(error);
  }
});

// | PATCH | /pet/:id | Allows shelter user to edit pet | shelter | ❌ |
router.patch('/:id', async (req, res, next) => {
  // ...
});

router.delete('/:id', async (req, res, next) => {
  try {
    await Pet.findByIdAndDelete(req.params.id);
    res.json({});
  } catch (error) {
    next(error);
  }
});

module.exports = router;
