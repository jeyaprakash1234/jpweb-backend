const express = require('express');
const Booking = require('../models/Booking');

const router = express.Router();

// POST /api/bookings - Create a new booking
router.post('/bookings', async (req, res) => {
  const { firstName, lastName, phoneNumber, serviceType, description, termsAccepted } = req.body;

  // Check if terms are accepted
  if (!termsAccepted) {
    return res.status(400).json({ message: 'You must accept the terms and conditions' });
  }

  try {
    const newBooking = new Booking({
      firstName,
      lastName,
      phoneNumber,
      serviceType,
      description,
      termsAccepted,
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking created successfully', booking: savedBooking });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create booking', error: error.message });
  }
});

module.exports = router;
