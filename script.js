// Automatic language detection (browser preferred)
const langButtons = document.querySelectorAll("nav button");
const userLang = navigator.language.slice(0,2);
const supportedLangs = ["en","de","es","pt","ru"];
const defaultLang = supportedLangs.includes(userLang) ? userLang : "en";

async function loadLang(lang) {
  const res = await fetch(`translations/${lang}.json`);
  const data = await res.json();
  document.getElementById("title").textContent = data.title;
  document.getElementById("subtitle").textContent = data.subtitle;
  document.getElementById("section_about_title").textContent = data.about_title;
  document.getElementById("section_about_text").textContent = data.about_text;
  document.getElementById("section_work_title").textContent = data.work_title;
  document.getElementById("section_work_text").textContent = data.work_text;
}

loadLang(defaultLang);

langButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    const lang = btn.getAttribute("data-lang");
    loadLang(lang);
  });
});
