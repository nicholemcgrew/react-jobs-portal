// server.js
import express from 'express';
import dotenv from 'dotenv'; // Import dotenv

dotenv.config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT || 8000; // Use the provided port or default to 8000

// Define a simple route
app.get('/api/jobs', (req, res) => {
  // Respond with mock data for now
  const jobs = [
    { id: 1, title: 'Software Engineer', company: 'Example Inc.' },
    { id: 2, title: 'Web Developer', company: 'Sample Co.' },
  ];
  res.json(jobs);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
