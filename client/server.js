const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const employeeRoutes = require('./route/employee');

dotenv.config();

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/api', employeeRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});