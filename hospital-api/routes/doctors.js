const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all doctors
router.get('/', (req, res) => {
  db.query('SELECT * FROM doctors', (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Search doctors by name or ID
router.get('/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  db.query(
    'SELECT * FROM doctors WHERE name LIKE ? OR doctor_id = ?',
    [`%${q}%`, q],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

// POST a new doctor
router.post('/', (req, res) => {
  const { name, specialty, phone, email, address } = req.body;
  db.query(
    'INSERT INTO doctors (name, specialty, phone, email, address) VALUES (?, ?, ?, ?, ?)',
    [name, specialty, phone, email, address],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, message: 'Doctor added!' });
    }
  );
});

module.exports = router;
