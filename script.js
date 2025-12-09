async function loadLang(lang) {
  try {
    const res = await fetch(`translations/${lang}.json?v=${Date.now()}`);
    const data = await res.json();
    document.title = data.title;
    document.getElementById('title').textContent = data.title;
    document.getElementById('welcome').textContent = data.welcome;
    document.getElementById('description').textContent = data.description;
  } catch (e) {
    console.error("Language load failed:", e);
  }
}

// default: English
loadLang('en');

// language switch buttons
document.querySelectorAll('.lang').forEach(btn => {
  btn.addEventListener('click', () => loadLang(btn.dataset.lang));
});
