/* ===========================
   Missing Emblem - i18n Script
   =========================== */

const defaultLang = 'en';
const supportedLangs = ['en', 'de', 'es', 'pt', 'ru', 'fa'];
let currentLang = localStorage.getItem('lang') || defaultLang;

/* ---------- Load Translations ---------- */
async function loadTranslations(lang) {
  if (!supportedLangs.includes(lang)) lang = defaultLang;

  try {
    const response = await fetch(`translations/${lang}.json?v=${Date.now()}`);
    const data = await response.json();
    applyTranslations(data);
    document.documentElement.lang = lang;
    localStorage.setItem('lang', lang);

    // RTL toggle for Persian
    if (lang === 'fa') {
      document.documentElement.setAttribute('dir', 'rtl');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
    }
  } catch (err) {
    console.error('Translation load error:', err);
  }
}

/* ---------- Apply Translations to DOM ---------- */
function applyTranslations(dictionary) {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (dictionary[key]) el.textContent = dictionary[key];
  });
}

/* ---------- Change Language from Selector ---------- */
function changeLanguage(lang) {
  if (supportedLangs.includes(lang)) {
    loadTranslations(lang);
  }
}

/* ---------- Initialize Page ---------- */
document.addEventListener('DOMContentLoaded', () => {
  loadTranslations(currentLang);

  // Optional: attach to dropdown or buttons
  document.querySelectorAll('[data-lang]').forEach(button => {
    button.addEventListener('click', () => {
      const chosenLang = button.getAttribute('data-lang');
      changeLanguage(chosenLang);
    });
  });
});
