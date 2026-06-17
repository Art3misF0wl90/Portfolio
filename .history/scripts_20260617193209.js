async function loadNav() {
    const response = await fetch('nav.html');
    const navHtml = await response.text();
    document.getElementById('nav-placeholder').innerHTML = navHtml;
}