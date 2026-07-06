// Loading Navbar
fetch("../components/navbar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("navbar").innerHTML = data;
  });

// Loading Footer
fetch("../components/footer.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("footer").innerHTML = data;
  });

// Loading Sidebar
fetch("../components/sidebar.html")
  .then((response) => response.text())
  .then((data) => {
    document.getElementById("sidebar").innerHTML = data;
    const currentPage =
      window.CURRENT_PAGE ||
      window.location.pathname.split("/").pop().replace(".html", "");
    const navLinks = document.querySelectorAll(".nav-item");
    navLinks.forEach((link) => {
      if (link.getAttribute("data-page") === currentPage) {
        link.classList.add("active");
      }
    });
  });
