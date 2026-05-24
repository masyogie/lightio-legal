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
    { icon: '🌐', title: 'Multilingual Summaries', desc: 'AI summaries default to English. Verify your phone number and Lightio detects your country from it — switching summaries to that country\'s primary language.' },
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
    { icon: '🔒', title: 'On-Device Processing', desc: 'Images you capture never leave your iPhone. Only the resulting object label is sent for Hadith lookup.' },
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

// ===== Prayer preset switch =====
const prayerData = {
  mwl: {
    label: 'MWL · Muslim World League',
    loc: '📍 Universal default · Fajr 18° / Isha 17°',
    times: [
      { name: 'Fajr', glyph: 'ف', time: '04:21', sub: 'Fajr angle 18°' },
      { name: 'Sunrise', glyph: '☀', time: '05:38', sub: 'Tulu\' al-Shams' },
      { name: 'Dhuhr', glyph: 'ظ', time: '12:08', sub: 'Solar noon' },
      { name: 'Asr', glyph: 'ع', time: '15:34', sub: 'Standard (Shafi\'i)' },
      { name: 'Maghrib', glyph: 'م', time: '18:23', sub: 'Sunset', next: true },
      { name: 'Isha', glyph: 'ع', time: '19:47', sub: 'Isha angle 17°' },
    ]
  },
  isna: {
    label: 'ISNA · Islamic Society of North America',
    loc: '📍 North America · Fajr 15° / Isha 15°',
    times: [
      { name: 'Fajr', glyph: 'ف', time: '04:38', sub: 'Fajr angle 15°' },
      { name: 'Sunrise', glyph: '☀', time: '05:38', sub: 'Tulu\' al-Shams' },
      { name: 'Dhuhr', glyph: 'ظ', time: '12:08', sub: 'Solar noon' },
      { name: 'Asr', glyph: 'ع', time: '15:34', sub: 'Standard (Shafi\'i)' },
      { name: 'Maghrib', glyph: 'م', time: '18:23', sub: 'Sunset', next: true },
      { name: 'Isha', glyph: 'ع', time: '19:31', sub: 'Isha angle 15°' },
    ]
  },
  egypt: {
    label: 'Egypt · General Authority of Survey',
    loc: '📍 North Africa &amp; Levant · Fajr 19.5° / Isha 17.5°',
    times: [
      { name: 'Fajr', glyph: 'ف', time: '04:14', sub: 'Fajr angle 19.5°' },
      { name: 'Sunrise', glyph: '☀', time: '05:38', sub: 'Tulu\' al-Shams' },
      { name: 'Dhuhr', glyph: 'ظ', time: '12:08', sub: 'Solar noon' },
      { name: 'Asr', glyph: 'ع', time: '15:34', sub: 'Standard (Shafi\'i)' },
      { name: 'Maghrib', glyph: 'م', time: '18:23', sub: 'Sunset', next: true },
      { name: 'Isha', glyph: 'ع', time: '19:51', sub: 'Isha angle 17.5°' },
    ]
  },
  makkah: {
    label: 'Umm al-Qura · Makkah, Saudi Arabia',
    loc: '📍 Gulf region · Fajr 18.5° / Isha 90 min after Maghrib',
    times: [
      { name: 'Fajr', glyph: 'ف', time: '04:18', sub: 'Fajr angle 18.5°' },
      { name: 'Sunrise', glyph: '☀', time: '05:38', sub: 'Tulu\' al-Shams' },
      { name: 'Dhuhr', glyph: 'ظ', time: '12:08', sub: 'Solar noon' },
      { name: 'Asr', glyph: 'ع', time: '15:34', sub: 'Standard (Shafi\'i)' },
      { name: 'Maghrib', glyph: 'م', time: '18:23', sub: 'Sunset', next: true },
      { name: 'Isha', glyph: 'ع', time: '19:53', sub: '90 min after Maghrib' },
    ]
  },
  karachi: {
    label: 'Karachi · University of Islamic Sciences',
    loc: '📍 South Asia · Fajr 18° / Isha 18°',
    times: [
      { name: 'Fajr', glyph: 'ف', time: '04:21', sub: 'Fajr angle 18°' },
      { name: 'Sunrise', glyph: '☀', time: '05:38', sub: 'Tulu\' al-Shams' },
      { name: 'Dhuhr', glyph: 'ظ', time: '12:08', sub: 'Solar noon' },
      { name: 'Asr', glyph: 'ع', time: '16:22', sub: 'Hanafi calculation' },
      { name: 'Maghrib', glyph: 'م', time: '18:23', sub: 'Sunset', next: true },
      { name: 'Isha', glyph: 'ع', time: '19:55', sub: 'Isha angle 18°' },
    ]
  },
  muhammadiyah: {
    label: 'Muhammadiyah · Munas Tarjih ke-31',
    loc: '📍 Indonesia · Fajr 20° / Isha 18°',
    times: [
      { name: 'Fajr', glyph: 'ف', time: '04:13', sub: 'Fajr angle 20°' },
      { name: 'Sunrise', glyph: '☀', time: '05:34', sub: 'Tulu\' al-Shams' },
      { name: 'Dhuhr', glyph: 'ظ', time: '11:42', sub: 'Zenith + buffer' },
      { name: 'Asr', glyph: 'ع', time: '15:04', sub: 'Standard (Shafi\'i)' },
      { name: 'Maghrib', glyph: 'م', time: '17:51', sub: 'Sunset', next: true },
      { name: 'Isha', glyph: 'ع', time: '19:02', sub: 'Isha angle 18°' },
    ]
  }
};
function renderPrayer(preset) {
  const data = prayerData[preset];
  document.getElementById('presetLabel').textContent = data.label;
  const locEl = document.getElementById('presetLoc');
  if (locEl) locEl.innerHTML = data.loc;
  document.getElementById('prayerRows').innerHTML = data.times.map(t => `
    <div class="prayer-row ${t.next ? 'next' : ''}">
      <span class="glyph">${t.glyph}</span>
      <div class="name">${t.name}<small>${t.sub}</small></div>
      <span class="time">${t.time}</span>
      <span class="bell">${t.next ? '🔔' : '○'}</span>
    </div>
  `).join('');
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
    a: 'No. Image processing happens entirely on your iPhone using the Apple Neural Engine. Only the resulting object label (like "date" or "cup") is sent to our Hadith search backend — never the image itself.'
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
    a: 'iPhone running iOS 18.6 or later. The on-device ML model uses Core ML and the Apple Neural Engine, which is available on most modern iPhones.'
  },
  {
    q: 'Can I delete all my data?',
    a: 'Absolutely. The in-app Data Dashboard lets you export everything as a file, or permanently delete your history, favorites, profile, and cloud backup — exercising your full GDPR rights without contacting support.'
  },
  {
    q: 'Why only 80 objects?',
    a: 'Lightio uses the COCO object vocabulary — 80 categories that cover most common everyday objects. We deliberately chose breadth over depth in this version so detection is fast, accurate, and works without a server.'
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
