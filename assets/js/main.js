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
    highlightActiveNavItem(); // run after sidebar loads
  });

// Highlight the active sidebar link
function highlightActiveNavItem() {
  const currentPage = window.location.pathname.split("/").pop();

  document.querySelectorAll(".sidebar .nav-item").forEach((link) => {
    const linkPage = link.getAttribute("href").split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".tab");
  const panels = {
    received: document.getElementById("received-panel"),
    sent: document.getElementById("sent-panel"),
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();

      tabs.forEach((t) => t.classList.remove("tab-active"));
      tab.classList.add("tab-active");

      const target = tab.dataset.tab;
      Object.keys(panels).forEach((key) => {
        panels[key].style.display = key === target ? "grid" : "none";
      });
    });
  });
});
