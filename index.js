
import express from 'express';
import sweph from 'sweph';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  res.send('Swiss Ephemeris microservice online.');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
