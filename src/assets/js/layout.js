async function loadHTML(id, file) {
  const el = document.getElementById(id);
  if (el) {
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      el.innerHTML = await res.text();
    } catch (err) {
      console.error(`Could not load ${file}:`, err);
    }
  }
}

loadHTML('header', '/partials/header.html');
loadHTML('footer', '/partials/footer.html');
