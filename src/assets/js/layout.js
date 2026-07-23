export async function loadLayout() {
    const header = document.querySelector("#site-header");
    const footer = document.querySelector("#site-footer");

    if (header) {
        const res = await fetch("/partials/header.html");
        header.innerHTML = await res.text();
    }

    if (footer) {
        const res = await fetch("/partials/footer.html");
        footer.innerHTML = await res.text();
    }
}