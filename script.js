/* =========================================
   CONIXEN V2 — MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* ================= MOBILE MENU ================= */

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

      mobileMenu.classList.toggle("show");

      menuBtn.textContent =
        mobileMenu.classList.contains("show")
          ? "✕"
          : "☰";

    });

  }


  /* Close mobile menu after selecting a link */

  if (mobileMenu) {

    const mobileLinks =
      mobileMenu.querySelectorAll("a");

    mobileLinks.forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("show");

        if (menuBtn) {
          menuBtn.textContent = "☰";
        }

      });

    });

  }


  /* ================= HERO SEARCH ================= */

  const searchForm =
    document.getElementById("searchForm");

  const searchInput =
    document.getElementById("searchInput");


  function performSearch(query) {

    query = query.trim();

    if (!query) {

      if (searchInput) {
        searchInput.focus();
      }

      return;
    }

    window.location.href =
      "pages/wallpapers.html?search=" +
      encodeURIComponent(query);

  }


  if (searchForm) {

    searchForm.addEventListener("submit", (event) => {

      event.preventDefault();

      if (searchInput) {
        performSearch(searchInput.value);
      }

    });

  }


  /* ================= QUICK FILTERS ================= */

  const quickFilters =
    document.querySelectorAll(".quick-filters button");

  quickFilters.forEach((button) => {

    button.addEventListener("click", () => {

      const value =
        button.textContent.trim();

      if (searchInput) {

        searchInput.value = value;

        performSearch(value);

      }

    });

  });


  /* ================= SEARCH MODAL ================= */

  const openSearch =
    document.getElementById("openSearch");

  const searchModal =
    document.getElementById("searchModal");

  const closeSearch =
    document.getElementById("closeSearch");

  const modalInput =
    document.getElementById("modalSearchInput");

  const modalSearchButton =
    document.getElementById("modalSearchButton");


  function openSearchModal() {

    if (!searchModal) return;

    searchModal.classList.add("show");

    setTimeout(() => {

      if (modalInput) {
        modalInput.focus();
      }

    }, 100);

  }


  function closeSearchModal() {

    if (!searchModal) return;

    searchModal.classList.remove("show");

  }


  if (openSearch) {

    openSearch.addEventListener(
      "click",
      openSearchModal
    );

  }


  if (closeSearch) {

    closeSearch.addEventListener(
      "click",
      closeSearchModal
    );

  }


  /* Click outside search box */

  if (searchModal) {

    searchModal.addEventListener("click", (event) => {

      if (event.target === searchModal) {
        closeSearchModal();
      }

    });

  }


  /* ESC closes search */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
      closeSearchModal();
    }

  });


  if (modalSearchButton) {

    modalSearchButton.addEventListener(
      "click",
      () => {

        if (!modalInput) return;

        performSearch(modalInput.value);

      }
    );

  }


  if (modalInput) {

    modalInput.addEventListener("keydown", (event) => {

      if (event.key === "Enter") {

        event.preventDefault();

        performSearch(modalInput.value);

      }

    });

  }


  /* ================= FAVORITES ================= */

  const hearts =
    document.querySelectorAll(".heart");


  hearts.forEach((heart, index) => {

    heart.addEventListener("click", (event) => {

      event.preventDefault();
      event.stopPropagation();

      heart.classList.toggle("liked");

      if (heart.classList.contains("liked")) {

        heart.textContent = "♥";

        heart.style.color = "#ff416c";

        heart.style.borderColor = "#ff416c";

        localStorage.setItem(
          `conixen-favorite-${index}`,
          "true"
        );

      } else {

        heart.textContent = "♡";

        heart.style.color = "";

        heart.style.borderColor = "";

        localStorage.removeItem(
          `conixen-favorite-${index}`
        );

      }

    });


    /* Restore favorites */

    const saved =
      localStorage.getItem(
        `conixen-favorite-${index}`
      );

    if (saved === "true") {

      heart.classList.add("liked");

      heart.textContent = "♥";

      heart.style.color = "#ff416c";

      heart.style.borderColor = "#ff416c";

    }

  });


  /* ================= CARD ANIMATION ================= */

  const cards =
    document.querySelectorAll(
      ".wallpaper-card, .category-card, .device-card, .featured-item"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (entry.isIntersecting) {

              entry.target.classList.add(
                "visible"
              );

              observer.unobserve(
                entry.target
              );

            }

          });

        },
        {
          threshold: 0.08
        }
      );


    cards.forEach((card) => {

      card.classList.add("reveal");

      observer.observe(card);

    });

  }


  /* ================= CATEGORY TRACKING ================= */

  const categoryCards =
    document.querySelectorAll(
      ".category-card"
    );


  categoryCards.forEach((category) => {

    category.addEventListener("click", () => {

      const name =
        category.querySelector("h3")
          ?.textContent
          ?.trim();

      if (name) {

        console.log(
          "CONIXEN category:",
          name
        );

      }

    });

  });


  /* ================= DEVICE TRACKING ================= */

  const deviceCards =
    document.querySelectorAll(
      ".device-card"
    );


  deviceCards.forEach((device) => {

    device.addEventListener("click", () => {

      const name =
        device.querySelector("h3")
          ?.textContent
          ?.trim();

      if (name) {

        console.log(
          "CONIXEN device:",
          name
        );

      }

    });

  });


  /* ================= HEART FEEDBACK ================= */

  hearts.forEach((heart) => {

    heart.addEventListener("animationend", () => {

      heart.style.transform = "";

    });

  });


  /* ================= YEAR ================= */

  const yearElements =
    document.querySelectorAll(
      ".current-year"
    );


  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


  /* ================= CONIXEN READY ================= */

  console.log(
    "CONIXEN V2 loaded successfully 🚀"
  );

});
