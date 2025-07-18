import express from 'express';
import initSweph from 'sweph';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

let swe = null;

// Inizializzazione asincrona di sweph-wasm
initSweph().then((loadedSweph) => {
  swe = loadedSweph;

  app.get('/', (req, res) => {
    res.send('✅ Swiss Ephemeris microservice ready.');
  });

  app.post('/transit', (req, res) => {
    if (!swe) {
      return res.status(503).json({ error: 'Swiss Ephemeris not ready yet' });
    }

    const { jd = 2458849.5 } = req.body;
    const ipl = swe.SUN;
    const flags = swe.FLAGS.SEFLG_SWIEPH;

    try {
      const result = swe.calc(jd, ipl, flags);

      if (result.rc !== swe.OK) {
        return res.status(500).json({ error: result.error });
      }

      res.json({
        planet: 'sun',
        jd,
        position: result.x
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  app.listen(port, () => {
    console.log(`🌐 Server running on port ${port}`);
  });
}).catch((err) => {
  console.error('❌ Failed to initialize Swiss Ephemeris:', err);
});
