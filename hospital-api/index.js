const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 3000;
const patientRoutes = require('./routes/patients');
const doctorRoutes = require('./routes/doctors');
const appointmentRoutes = require('./routes/appointments');
const billingRoutes = require('./routes/billing');
const recordRoutes = require('./routes/records');
const queryRoutes = require('./routes/query');

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/patients', patientRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/billing', billingRoutes);
app.use('/api/records', recordRoutes);
app.use('/query', queryRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
