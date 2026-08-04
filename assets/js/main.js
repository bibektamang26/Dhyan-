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

//requests page
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

// Settings page
const appearanceCards = document.querySelectorAll(".appearance-card");

appearanceCards.forEach((card, index) => {
  card.addEventListener("click", () => {
    appearanceCards.forEach((c) =>
      c.classList.remove("appearance-card-active"),
    );
    card.classList.add("appearance-card-active");

    const mode = index === 0 ? "light" : index === 1 ? "dark" : "system";
    applyTheme(mode);
    localStorage.setItem("dhyan-theme", mode);
  });
});

function applyTheme(mode) {
  if (mode === "system") {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    document.documentElement.setAttribute(
      "data-theme",
      prefersDark ? "dark" : "light",
    );
  } else {
    document.documentElement.setAttribute("data-theme", mode);
  }
}

const savedTheme = localStorage.getItem("dhyan-theme") || "light";
applyTheme(savedTheme);
const savedIndex = savedTheme === "light" ? 0 : savedTheme === "dark" ? 1 : 2;
if (appearanceCards[savedIndex]) {
  appearanceCards.forEach((c) => c.classList.remove("appearance-card-active"));
  appearanceCards[savedIndex].classList.add("appearance-card-active");
}

const toggles = document.querySelectorAll(".toggle");

toggles.forEach((toggle) => {
  toggle.addEventListener("click", () => {
    const isOn = toggle.classList.toggle("toggle-on");
    toggle.setAttribute("aria-pressed", isOn ? "true" : "false");
  });
});

// edit profile details
const editBtn = document.getElementById("edit-profile-btn");
const displayNameInput = document.getElementById("display-name");
const academicBioInput = document.getElementById("academic-bio");
const profileInputs = [displayNameInput, academicBioInput];

let isEditingProfile = false;

editBtn.addEventListener("click", (e) => {
  e.preventDefault();

  isEditingProfile = !isEditingProfile;

  profileInputs.forEach((input) => {
    input.readOnly = !isEditingProfile;
  });

  editBtn.textContent = isEditingProfile ? "Done editing" : "Edit details";

  if (isEditingProfile) {
    displayNameInput.focus();
  }
});
