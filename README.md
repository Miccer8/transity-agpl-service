# Transity AGPL Service

Microservizio Node.js basato su `sweph` (Swiss Ephemeris AGPL).

## Endpoint

GET /transit?datetime=2025-07-18T12:00:00Z&lat=45.46&lon=9.19

Restituisce:
{
  "Sun": { "lon": ..., "lat": ... },
  ...
}
