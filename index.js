const swe = require('sweph');
const express = require('express');
const app = express();

app.get('/transit', (req, res) => {
  const { datetime, lat, lon } = req.query;

  if (!datetime || !lat || !lon) {
    return res.status(400).json({ error: "Missing parameters" });
  }

  const date = new Date(datetime);
  const julDay = swe.julday(
    date.getUTCFullYear(),
    date.getUTCMonth() + 1,
    date.getUTCDate(),
    date.getUTCHours() + date.getUTCMinutes() / 60.0
  );

  const planets = [swe.SUN, swe.MOON, swe.MERCURY, swe.VENUS, swe.MARS];
  const flags = swe.FLG_SWIEPH;
  const result = {};

  for (const planet of planets) {
    const calc = swe.calc_ut(julDay, planet, flags);
    result[swe.get_planet_name(planet)] = {
      lon: calc.longitude,
      lat: calc.latitude
    };
  }

  res.json(result);
});

app.listen(3000, () => {
  console.log('Microservizio AGPL attivo su http://localhost:3000');
});
