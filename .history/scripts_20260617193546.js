async function loadNav() {
    try{

    }
  
}

loadNav();

async function loadFooter() {
  const response = await fetch("footer.html");
  const footerHtml = await response.text();
  document.getElementById("footer-placeholder").innerHTML = footerHtml;
}

loadFooter();
