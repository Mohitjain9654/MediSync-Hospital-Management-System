const express = require('express');
const router = express.Router();
const pool = require('../db'); // path to your db.js

router.post('/', async (req, res) => {
  const { query } = req.body;
  console.log("Received SQL Query:", query); // 👀 Check if this logs

  if (!query.toLowerCase().startsWith('select')) {
    return res.status(400).json({ message: 'Only SELECT queries are allowed.' });
  }

  try {
    const [rows] = await pool.query(query);
    console.log("Query result:", rows); // 👀 This should log result
    res.json({ rows });
  } catch (err) {
    console.error("Query Error:", err.message);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
