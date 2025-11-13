const lanes = {
  'uk': { currency: '€', rate: 6.5, handling: 25, unit: 'kg', mode: 'air', duration: '3–4 working days' },
  'china-sea': { currency: 'KSh', rate: 60000, handling: 0, unit: 'CBM', mode: 'sea', duration: '45 working days' },
  'europe': { currency: '€', rate: 10, handling: 30, unit: 'kg', mode: 'air', duration: '4–5 working days' },
  'turkey': { currency: '€', rate: 8, handling: 0, unit: 'kg', mode: 'air', duration: '4–5 working days' },
  'south-africa': { currency: '€', rate: 8, handling: 25, unit: 'kg', mode: 'air', duration: '3–4 working days' },
  'china-air': { currency: '€', rate: 10.5, rateRestricted: 13, handling: 0, unit: 'kg', mode: 'air', duration: '7–10 working days' },
  'usa': { currency: '€', rate: 15, handling: 0, unit: 'kg', mode: 'air', duration: '7 working days' },
  'dubai-air': { currency: '€', rate: 9, handling: 0, unit: 'kg', mode: 'air', duration: '4–5 working days' },
  'uk-sea': { currency: '€', rate: 2.5, handling: 15, unit: 'kg', mode: 'sea', duration: '30–45 working days' },
  'india': { currency: '€', rate: 10, handling: 0, unit: 'kg', mode: 'air', duration: '7 working days' },
  'dubai-sea': { currency: 'KSh', rate: 62000, handling: 0, unit: 'CBM', mode: 'sea', duration: '40 working days' }
};

function toast(msg, type) {
  const el = document.createElement('div');
  el.style.cssText = `position:fixed;top:20px;right:20px;padding:12px 16px;border-radius:10px;color:#fff;font-weight:700;z-index:1000;background:${type === 'error' ? '#ef4444' : type === 'success' ? '#22c55e' : '#3b82f6'};box-shadow:0 10px 20px rgba(0,0,0,.15)`;
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 2800);
}

function clearForm(ids) {
  ids.forEach(id => document.getElementById(id).value = '');
}

function updateLaneMeta(origin, metaElement) {
  if (!origin || !lanes[origin]) {
    metaElement.innerHTML = '';
    return;
  }
  const lane = lanes[origin];
  metaElement.innerHTML = `<span class='pill'>Rate: ${lane.currency}${lane.rate}/${lane.unit}</span><span class='pill'>Handling: ${lane.currency}${lane.handling}</span><span class='pill'>Transit: ${lane.duration}</span>`;
}