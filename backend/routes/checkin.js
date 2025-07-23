// routes/checkin.js
import express from 'express';
const router = express.Router();

import Checkin from '../models/Checkin.js';

// Sample GET route
router.get('/', async (req, res) => {
  try {
    const allCheckins = await Checkin.find().populate('user');
    res.json(allCheckins);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// Sample POST route
router.post('/', async (req, res) => {
  try {
    const newCheckin = new Checkin(req.body);
    await newCheckin.save();
    res.status(201).json(newCheckin);
  } catch (error) {
    res.status(400).json({ message: 'Error saving checkin', error });
  }
});

export default router;
