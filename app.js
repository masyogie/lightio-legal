import * as adhan from 'https://cdn.jsdelivr.net/npm/adhan@4.4.3/+esm';

// ===== Mobile nav =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('primary-nav');
navToggle?.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => navLinks.classList.remove('open')));

// ===== Hero phone step rotation =====
const phoneSteps = document.querySelectorAll('.phone-step');
const stepDots = document.querySelectorAll('.step-dot');
let phoneIdx = 0;
function advancePhone() {
  phoneSteps.forEach((s, i) => s.classList.toggle('active', i === phoneIdx));
  stepDots.forEach((d, i) => d.classList.toggle('active', i === phoneIdx));
  phoneIdx = (phoneIdx + 1) % phoneSteps.length;
}
setInterval(advancePhone, 3200);

// Allow click on dots to jump
stepDots.forEach((d, i) => d.addEventListener('click', (e) => {
  e.stopPropagation();
  phoneIdx = i;
  phoneSteps.forEach((s, j) => s.classList.toggle('active', j === i));
  stepDots.forEach((dd, j) => dd.classList.toggle('active', j === i));
}));

// ===== Features tab =====
const featureCats = {
  discover: [
    { icon: '👁️', title: 'Visual Hadith Discovery', desc: 'Point your camera at everyday objects and instantly find related Hadiths via on-device object detection.' },
    { icon: '🔍', title: 'AI-Powered Search', desc: 'Our intelligent system sifts through authentic Hadith collections to bring you the most relevant results.' },
    { icon: '🌐', title: 'Multilingual Summaries', desc: 'AI summaries default to English. Signed-in users pick a preferred translation language in Settings — applied to every summary and prayer-reminder notification.' },
    { icon: '📜', title: 'Full Narrator Chain', desc: 'Every Hadith includes the original Arabic, English narrator information, and source collection.' },
  ],
  personalize: [
    { icon: '⭐', title: 'Save Your Favorites', desc: 'Keep meaningful Hadiths within reach by saving them to a personal favorites list, organized your way.' },
    { icon: '🕰️', title: 'Review Your History', desc: 'Easily revisit previously discovered objects and their associated Hadiths — your personal learning trail.' },
    { icon: '☁️', title: 'Cross-Device Sync', desc: 'With your consent, favorites and detection history sync securely across all your iPhones and iPads.' },
    { icon: '✨', title: 'Personalized Suggestions', desc: 'When enabled, Lightio tailors Hadith recommendations based on your interactions for a deeper journey.' },
  ],
  prayer: [
    { icon: '🕌', title: 'Five Daily Reminders', desc: 'Opt in to receive local notifications for Fajr, Dhuhr, Asr, Maghrib, and Isha — scheduled fully on-device.' },
    { icon: '🌍', title: '8 Global Calculation Methods', desc: 'MWL, ISNA, Egypt, Umm al-Qura, Karachi, Muhammadiyah, Kemenag, and Tehran — covering Muslims everywhere.' },
    { icon: '📍', title: 'Auto-detected Location', desc: 'Lightio uses your city, country, and time zone to calculate prayer times accurately wherever you travel.' },
    { icon: '📐', title: 'Asr Calculation Choice', desc: 'Choose between Standard and Hanafi Asr calculation — framed neutrally, no madhab labels.' },
    { icon: '🌤️', title: 'Sun & Weather Insights', desc: 'Sunrise, solar noon, and sunset appear beneath Today\'s Schedule, and notifications enrich hadith reflections with current weather — powered by Apple WeatherKit.' },
  ],
  privacy: [
    { icon: '🔒', title: 'On-Device Processing', desc: 'Images you capture never leave your iPhone. Only the resulting object or scene label is sent for Hadith lookup.' },
    { icon: '⚖️', title: 'Granular Consent', desc: 'Five independent toggles let you opt into analytics, personalization, cloud sync, and prayer reminders.' },
    { icon: '📤', title: 'Data Export & Deletion', desc: 'Export everything, or delete it all — directly from the in-app Data Dashboard. Your GDPR rights, one tap away.' },
    { icon: '🍎', title: 'Sign in with Apple', desc: 'Quick, private, and secure sign-in using your Apple ID. No extra password to remember.' },
  ],
};
const featureIconColors = {
  discover: 'var(--primary-soft)',
  personalize: '#FFF4E6',
  prayer: '#E8F5E9',
  privacy: '#F0EAFE',
};
function renderFeatures(cat) {
  const grid = document.getElementById('featuresGrid');
  grid.innerHTML = featureCats[cat].map(f => `
    <div class="feature-card">
      <div class="feature-icon" style="background:${featureIconColors[cat]};font-size:22px">${f.icon}</div>
      <h3>${f.title}</h3>
      <p>${f.desc}</p>
    </div>
  `).join('');
}
document.querySelectorAll('.tab-btn').forEach(btn => {
  const cat = btn.dataset.cat;
  const countEl = btn.querySelector('.tab-count');
  if (countEl && featureCats[cat]) countEl.textContent = featureCats[cat].length;
  btn.addEventListener('click', () => {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderFeatures(cat);
  });
});
renderFeatures('discover');

// ===== Prayer preset switch (live Adhan calculation) =====
const MECCA   = { coords: [21.4225, 39.8262],  tz: 'Asia/Riyadh',  city: 'Mecca, Saudi Arabia' };
const YOGYA   = { coords: [-7.7956, 110.3695], tz: 'Asia/Jakarta', city: 'Yogyakarta, Indonesia' };

const PRESETS = {
  mwl:          { label: 'MWL · Muslim World League',               loc: MECCA, note: 'Fajr 18° / Isha 17°' },
  isna:         { label: 'ISNA · Islamic Society of North America', loc: MECCA, note: 'Fajr 15° / Isha 15°' },
  egypt:        { label: 'Egypt · General Authority of Survey',     loc: MECCA, note: 'Fajr 19.5° / Isha 17.5°' },
  makkah:       { label: 'Umm al-Qura · Makkah, Saudi Arabia',      loc: MECCA, note: 'Fajr 18.5° / Isha 90 min after Maghrib' },
  karachi:      { label: 'Karachi · University of Islamic Sciences', loc: MECCA, note: 'Fajr 18° / Isha 18°' },
  tehran:       { label: 'Tehran · Institute of Geophysics',         loc: MECCA, note: 'Fajr 17.7° / Isha 14° / Maghrib 4.5°' },
  muhammadiyah: { label: 'Muhammadiyah · Munas Tarjih ke-31',        loc: YOGYA, note: 'Fajr 18° / Isha 18° (2021 decree)' },
  kemenag:      { label: 'Kemenag · Ministry of Religious Affairs',  loc: YOGYA, note: 'Fajr 20° / Isha 18°' },
};

function paramsFor(key) {
  switch (key) {
    case 'mwl':     return adhan.CalculationMethod.MuslimWorldLeague();
    case 'isna':    return adhan.CalculationMethod.NorthAmerica();
    case 'egypt':   return adhan.CalculationMethod.Egyptian();
    case 'makkah':  return adhan.CalculationMethod.UmmAlQura();
    case 'karachi': return adhan.CalculationMethod.Karachi();
    case 'tehran':  return adhan.CalculationMethod.Tehran();
    case 'muhammadiyah': {
      const p = adhan.CalculationMethod.Other();
      p.fajrAngle = 18; p.ishaAngle = 18;
      return p;
    }
    case 'kemenag': {
      const p = adhan.CalculationMethod.Other();
      p.fajrAngle = 20; p.ishaAngle = 18;
      return p;
    }
  }
}

function ishaSub(p) {
  if (p.ishaInterval > 0) return `${p.ishaInterval} min after Maghrib`;
  return `Isha angle ${p.ishaAngle}°`;
}
function maghribSub(p) {
  if (p.maghribAngle) return `${p.maghribAngle}° below horizon (Jafari)`;
  return 'Sunset';
}

const PRAYER_ROWS = [
  { key: 'fajr',    pkey: adhan.Prayer.Fajr,    glyph: 'ف', name: 'Fajr',    sub: p => `Fajr angle ${p.fajrAngle}°` },
  { key: 'sunrise', pkey: adhan.Prayer.Sunrise, glyph: '☀', name: 'Sunrise', sub: () => 'Tulu\' al-Shams' },
  { key: 'dhuhr',   pkey: adhan.Prayer.Dhuhr,   glyph: 'ظ', name: 'Dhuhr',   sub: () => 'Solar noon' },
  { key: 'asr',     pkey: adhan.Prayer.Asr,     glyph: 'ع', name: 'Asr',     sub: () => 'Standard (Shafi\'i)' },
  { key: 'maghrib', pkey: adhan.Prayer.Maghrib, glyph: 'م', name: 'Maghrib', sub: maghribSub },
  { key: 'isha',    pkey: adhan.Prayer.Isha,    glyph: 'ع', name: 'Isha',    sub: ishaSub },
];

function fmtTime(d, tz) {
  return new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit', minute: '2-digit', timeZone: tz, hourCycle: 'h23'
  }).format(d);
}
function fmtDate(d, tz) {
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', timeZone: tz
  }).format(d);
}

// Build a Date whose browser-local Y/M/D matches today's calendar day in the target tz.
// Adhan-JS reads date.getFullYear/Month/Date as browser-local values for the calculation day.
function todayInTz(tz) {
  const parts = new Intl.DateTimeFormat('en-CA', {
    timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit'
  }).formatToParts(new Date());
  const y = +parts.find(p => p.type === 'year').value;
  const m = +parts.find(p => p.type === 'month').value - 1;
  const d = +parts.find(p => p.type === 'day').value;
  return new Date(y, m, d, 12, 0, 0);
}

function renderPrayer(presetKey) {
  const preset = PRESETS[presetKey];
  const params = paramsFor(presetKey);
  params.madhab = adhan.Madhab.Shafi;

  const coords = new adhan.Coordinates(preset.loc.coords[0], preset.loc.coords[1]);
  const date = todayInTz(preset.loc.tz);
  const times = new adhan.PrayerTimes(coords, date, params);
  const nextPrayer = times.nextPrayer(new Date());

  document.getElementById('presetLabel').textContent = preset.label;
  const locEl = document.getElementById('presetLoc');
  if (locEl) locEl.innerHTML = `📍 ${preset.loc.city} · ${preset.note}`;

  const dateEl = document.getElementById('prayerDate');
  if (dateEl) dateEl.textContent = fmtDate(new Date(), preset.loc.tz);

  document.getElementById('prayerRows').innerHTML = PRAYER_ROWS.map(row => {
    const t = times[row.key];
    const isNext = row.pkey === nextPrayer;
    return `
      <div class="prayer-row ${isNext ? 'next' : ''}">
        <span class="glyph">${row.glyph}</span>
        <div class="name">${row.name}<small>${row.sub(params)}</small></div>
        <span class="time">${fmtTime(t, preset.loc.tz)}</span>
        <span class="bell">${isNext ? '🔔' : '○'}</span>
      </div>
    `;
  }).join('');
}

document.querySelectorAll('.preset-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.preset-switch button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderPrayer(btn.dataset.preset);
  });
});
renderPrayer('mwl');

// ===== Consent toggles =====
const consents = { analytics: false, ui: false, data: false, cloud: false, prayer: false };
function updateConsentSummary() {
  const on = Object.values(consents).filter(Boolean).length;
  const summary = document.getElementById('consentSummary');
  if (on === 0) {
    summary.innerHTML = '<strong>0 of 5</strong> optional consents enabled. Lightio is collecting only essential data.';
  } else if (on === 5) {
    summary.innerHTML = '<strong>5 of 5</strong> — fully personalized experience with cloud sync &amp; prayer reminders.';
  } else {
    summary.innerHTML = `<strong>${on} of 5</strong> optional consents enabled. You can revoke any of these in the app anytime.`;
  }
}
document.querySelectorAll('.toggle[data-consent]').forEach(t => {
  t.addEventListener('click', () => {
    const key = t.dataset.consent;
    // Data Personalization requires UI Personalization
    if (key === 'data' && !consents.ui && !consents.data) {
      // turn ui on too
      consents.ui = true;
      document.querySelector('[data-consent="ui"]').classList.add('on');
    }
    if (key === 'ui' && consents.ui && consents.data) {
      // turning ui off must turn data off
      consents.data = false;
      document.querySelector('[data-consent="data"]').classList.remove('on');
    }
    consents[key] = !consents[key];
    t.classList.toggle('on', consents[key]);
    updateConsentSummary();
  });
});

// ===== FAQ =====
const faqs = [
  {
    q: 'Is Lightio really free? What\'s the catch?',
    a: 'Yes — Lightio is completely free with no ads. We may add in-app donation options later for users who want to support development, but core features will always remain free.'
  },
  {
    q: 'Does Lightio send my photos anywhere?',
    a: 'No. Image processing happens entirely on your iPhone using the Apple Neural Engine. Only the resulting object or scene label (like "date", "cup", or "garden") is sent to our Hadith search backend — never the image itself.'
  },
  {
    q: 'How accurate are the Hadiths?',
    a: 'Lightio draws from authentic Hadith collections including Sahih al-Bukhari, Sahih Muslim, and the four Sunan. Each result includes the source and narrator chain so you can verify it. AI-generated summaries are clearly labeled and always paired with the Arabic original.'
  },
  {
    q: 'Which prayer time calculation method should I choose?',
    a: 'Lightio offers 8 widely-used methods. MWL is a safe global default. ISNA works well in North America, Egypt for North Africa &amp; the Levant, Umm al-Qura for the Gulf, Karachi for South Asia, Muhammadiyah and Kemenag for Indonesia, and Tehran for Iran. All calculate fully on-device using the Adhan algorithm.'
  },
  {
    q: 'What devices does Lightio support?',
    a: 'iPhone running iOS 17.0 or later. The on-device ML model uses Core ML and the Apple Neural Engine, which is available on most modern iPhones.'
  },
  {
    q: 'Can I delete all my data?',
    a: 'Absolutely. The in-app Data Dashboard lets you export everything as a file, or permanently delete your history, favorites, profile, and cloud backup — exercising your full GDPR rights without contacting support.'
  },
  {
    q: 'How many things can Lightio recognize?',
    a: 'Lightio detects 80 everyday objects from the COCO vocabulary (YOLOX-M), and since v1.7 also classifies scenes and places via Apple Vision — gardens, mountains, bodies of water, and more. Both run on-device in a single pass, so you get a relevant Hadith even when there isn\'t one clear object to frame.'
  },
  {
    q: 'Will Lightio come to Android?',
    a: 'Not yet. As a small two-person team, we\'re focused on making the iOS version excellent first. Stay tuned at hello@yogie.id for updates.'
  },
];
const faqList = document.getElementById('faqList');
faqList.innerHTML = faqs.map((f, i) => `
  <div class="faq-item" data-i="${i}">
    <button class="faq-q">
      <span>${f.q}</span>
      <span class="plus">+</span>
    </button>
    <div class="faq-a"><div>${f.a}</div></div>
  </div>
`).join('');
faqList.querySelectorAll('.faq-item').forEach(item => {
  item.querySelector('.faq-q').addEventListener('click', () => {
    const wasOpen = item.classList.contains('open');
    faqList.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});
// open first by default
faqList.querySelector('.faq-item')?.classList.add('open');
