const langButtons = document.querySelectorAll('nav button');

async function loadLang(lang) {
  const res = await fetch(`translations/${lang}.json`);
  const data = await res.json();
  document.getElementById('title').textContent = data.title;
  document.getElementById('subtitle').textContent = data.subtitle;
}

// بارگذاری زبان پیش‌فرض
loadLang('en');

// تغییر زبان با کلیک
langButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang');
    loadLang(lang);
  });
});
