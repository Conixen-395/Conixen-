
/* =========================================
   CONIXEN — MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= MOBILE MENU ================= */

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");

      menuBtn.textContent =
        mobileMenu.classList.contains("open") ? "✕" : "☰";
    });
  }


  /* ================= SEARCH ================= */

  const heroSearch = document.getElementById("heroSearch");
  const heroSearchBtn = document.getElementById("heroSearchBtn");

  function performSearch() {

    if (!heroSearch) return;

    const query = heroSearch.value.trim();

    if (!query) {
      heroSearch.focus();
      return;
    }

    /*
      Temporary search system.

      Later this will connect to the real
      CONIXEN wallpaper database.
    */

    window.location.href =
      "pages/wallpapers.html?search=" +
      encodeURIComponent(query);
  }


  if (heroSearchBtn) {
    heroSearchBtn.addEventListener("click", performSearch);
  }


  if (heroSearch) {
    heroSearch.addEventListener("keydown", (event) => {

      if (event.key === "Enter") {
        performSearch();
      }

    });
  }


  /* ================= SEARCH BUTTON ================= */

  const openSearch = document.getElementById("openSearch");

  if (openSearch && heroSearch) {

    openSearch.addEventListener("click", () => {

      heroSearch.scrollIntoView({
        behavior: "smooth",
        block: "center"
      });

      setTimeout(() => {
        heroSearch.focus();
      }, 500);

    });

  }


  /* ================= FAVORITE BUTTONS ================= */

  const hearts = document.querySelectorAll(".heart");

  hearts.forEach((heart) => {

    heart.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();

      heart.classList.toggle("liked");

      if (heart.classList.contains("liked")) {
        heart.textContent = "♥";
        heart.style.color = "#ff4f7b";
      } else {
        heart.textContent = "♡";
        heart.style.color = "";
      }

    });

  });


  /* ================= CARD ANIMATION ================= */

  const cards = document.querySelectorAll(
    ".wallpaper-card, .category-card, .device-card, .trend-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {

      entries.forEach((entry) => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          observer.unobserve(entry.target);

        }

      });

    },
    {
      threshold: 0.08
    }
  );


  cards.forEach((card) => {

    card.style.opacity = "0";
    card.style.transform = "translateY(20px)";
    card.style.transition =
      "opacity 0.6s ease, transform 0.6s ease";

    observer.observe(card);

  });


  /* ================= CATEGORY FEEDBACK ================= */

  const categoryCards =
    document.querySelectorAll(".category-card");

  categoryCards.forEach((category) => {

    category.addEventListener("click", (event) => {

      /*
        Categories will later connect
        to their individual wallpaper pages.
      */

      const categoryName =
        category.querySelector("h3")?.textContent;

      if (categoryName) {
        console.log(
          "CONIXEN category:",
          categoryName
        );
      }

    });

  });


  /* ================= DEVICE FEEDBACK ================= */

  const deviceCards =
    document.querySelectorAll(".device-card");

  deviceCards.forEach((device) => {

    device.addEventListener("click", (event) => {

      event.preventDefault();

      const deviceName =
        device.querySelector("h3")?.textContent;

      if (deviceName) {

        console.log(
          "CONIXEN device:",
          deviceName
        );

      }

    });

  });


  /* ================= YEAR ================= */

  const copyright =
    document.querySelector(".copyright");

  if (copyright) {

    const year = new Date().getFullYear();

    copyright.textContent =
      `© ${year} CONIXEN. All rights reserved.`;

  }

});
