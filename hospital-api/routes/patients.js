const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all patients
router.get('/', (req, res) => {
  db.query('SELECT * FROM patients', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// POST new patient
router.post('/', (req, res) => {
  const { name, gender, dob, phone, email, address } = req.body;
  db.query('INSERT INTO patients (name, gender, dob, phone, email, address) VALUES (?, ?, ?, ?, ?, ?)',
    [name, gender, dob, phone, email, address],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.status(201).json({ id: result.insertId, message: 'Patient added!' });
    }
  );
});

// DELETE patient by ID
router.delete('/:id', (req, res) => {
  const patientId = req.params.id;
  db.query('DELETE FROM patients WHERE patient_id = ?', [patientId], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json({ message: 'Patient deleted successfully' });
  });
});

// Search patients by name or ID
router.get('/search', (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ message: 'Search query is required' });
  }

  db.query(
    'SELECT * FROM patients WHERE name LIKE ? OR patient_id = ?',
    [`%${q}%`, q],
    (err, results) => {
      if (err) return res.status(500).send(err);
      res.json(results);
    }
  );
});

module.exports = router;
