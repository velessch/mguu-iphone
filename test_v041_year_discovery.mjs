import fs from 'node:fs';
const app=fs.readFileSync(new URL('./app.js',import.meta.url),'utf8');
function need(rx,msg){if(!rx.test(app))throw new Error(msg);}
need(/const K_RATING_AVAILABLE_PERIODS_BASE='mguu_v041_rating_available_periods'/,'no dedicated period catalog storage');
need(/async function refreshRatingAvailablePeriods\(force,pickerKind\)[\s\S]*?fetchRatingResponse\(ratingGroupUrl\(ratingGroup\)\)/,'year refresh does not read rating.php');
need(/function startRatingBackgroundChecks\(\)[\s\S]*?refreshRatingAvailablePeriods\(false\)/,'year refresh is not automatic while app is active');
need(/async function loadRatingBooks\(\)[\s\S]*?refreshRatingAvailablePeriods\(true\)/,'opening rating does not force a fresh year list');
need(/if\(options&&options\.length\)\{ratingBindNativePeriodItems\(kind\);refreshRatingAvailablePeriods\(true,kind\);return;\}/,'cached picker suppresses fresh year discovery');
need(/ratingPeriodOptions=ratingMergePeriodOptions\(ratingPeriodOptions,ratingStoredAvailablePeriods\(\)\)/,'stored newly discovered years are not merged into picker');
const fn=app.match(/async function refreshRatingAvailablePeriods\(force,pickerKind\)\{[\s\S]*?\n\}/)?.[0]||'';
if(/ratingPeriod\.year\s*=/.test(fn)||/ratingPeriod\.semester\s*=/.test(fn))throw new Error('background year discovery must not switch the selected period');
if(app.includes('2026/2027 учебный год'))throw new Error('future year must not be hardcoded');
console.log('PASS v0.41: future academic years are discovered dynamically, cached, and added without changing selected rating period');
