async function loadNav() {
  try {
    const response = await fetch("nav.html");
    const navHtml = await response.text();
    document.getElementById("nav-placeholder").innerHTML = navHtml;
  } catch (error) {
    console.error("Error loading navigation:", error);
  }
}

loadNav();

async function loadFooter() {
  try {
    const response = await fetch("footer.html");
    const footerHtml = await response.text();
    document.getElementById("footer-placeholder").innerHTML = footerHtml;
  } catch (error) {
    console.error("Error loading footer:", error);
  }
}

loadFooter();
