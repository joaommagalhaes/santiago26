// Run with: node check-roadbook.cjs
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const html = fs.readFileSync(`${__dirname}/index.html`, 'utf8');
const data = JSON.parse(html.match(/id="roadbook-data">([\s\S]*?)<\/script>/)[1]);
const script = html.match(/<script>([\s\S]*?)<\/script>/)[1];
const context = vm.createContext({
  document: { getElementById: () => ({}), readyState: 'loading', addEventListener() {} },
  window: { addEventListener() {} },
  console, Intl, URLSearchParams,
});
vm.runInContext(script, context);
context.data = data;
vm.runInContext(`
  validateRoadbook(data);
  for (const row of weatherStages(data)) {
    const profile = row.detail.elevation.terrainProfile;
    if (!Array.isArray(profile) || profile.length < 2) throw new Error('Missing terrain profile');
    if (profile[0][0] !== 0) throw new Error('Profile must start at zero km');
    profile.forEach((point, i) => {
      if (point.length !== 2 || !point.every(Number.isFinite)) throw new Error('Invalid terrain sample');
      if (i && point[0] < profile[i - 1][0]) throw new Error('Distance must be monotonic');
    });
    if (Math.abs(profile.at(-1)[0] - row.distanceKmGps) > 0.15) throw new Error('Profile distance diverges from official route');
    const svg = renderAltimetryChart(row, data);
    if (!svg.includes('<svg') || /NaN|Infinity/.test(svg)) throw new Error('Invalid chart');
  }
  if (renderAltimetryChart(data.plan.itinerary[0], data) !== '') throw new Error('Arrival has no walking profile');
  if (weatherStages(data).length !== 7) throw new Error('Expected seven weather days');
  for (const row of weatherStages(data)) {
    if (!data.map.places.some(place => place.name.localeCompare(row.to, 'pt', { sensitivity: 'base' }) === 0)) throw new Error('Missing weather coordinates');
  }
  const daily = { time: ['2026-10-03'], temperature_2m_min: [12], temperature_2m_max: [20], precipitation_probability_max: [0], precipitation_sum: [0], wind_speed_10m_max: [8] };
  if (!forecastForDate(daily, '2026-10-03')) throw new Error('Zero rain is valid');
  if (forecastForDate(daily, '2026-10-04') !== null) throw new Error('Must match exact date');
  daily.temperature_2m_min[0] = null;
  if (forecastForDate(daily, '2026-10-03') !== null) throw new Error('Missing temperature must not become zero');
`, context);
const ids = data.plan.checklist.flatMap(group => group.items.map(item => item.id));
assert.equal(new Set(ids).size, ids.length, 'Packing IDs must be unique');
assert.equal(data.support.transport.status, 'Por decidir');
assert.equal(data.plan.trip.routePolicy, 'official');
console.log('Roadbook valid: exact forecast dates, missing data, coordinates and packing IDs checked.');
