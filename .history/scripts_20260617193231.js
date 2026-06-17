async function loadNav() {
    const response = await fetch('nav.html');
    const navHtml = await response.text();
    document.getElementById('nav-placeholder').innerHTML = navHtml;
}

load


async function loadFooter() {
    const response = await fetch('footer.html');
    const footerHtml = await response.text();
    document.getElementById('footer-placeholder').innerHTML = footerHtml;
}


loadFooter();