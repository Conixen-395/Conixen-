/* =========================================
   CONIXEN V3 — MAIN JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =========================================
     MOBILE MENU
     ========================================= */

  const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (menuBtn && mobileMenu) {

    menuBtn.addEventListener("click", () => {

      mobileMenu.classList.toggle("open");

      menuBtn.textContent =
        mobileMenu.classList.contains("open")
          ? "✕"
          : "☰";

    });

    mobileMenu.querySelectorAll("a").forEach((link) => {

      link.addEventListener("click", () => {

        mobileMenu.classList.remove("open");
        menuBtn.textContent = "☰";

      });

    });

  }


  /* =========================================
     SEARCH
     ========================================= */

  const searchForm = document.getElementById("searchForm");
  const searchInput = document.getElementById("searchInput");

  function performSearch(query) {

    const value = (query || "").trim();

    if (!value) {

      if (searchInput) {
        searchInput.focus();
      }

      return;

    }

    window.location.href =
      "pages/wallpapers.html?search=" +
      encodeURIComponent(value);

  }


  if (searchForm) {

    searchForm.addEventListener("submit", (event) => {

      event.preventDefault();

      performSearch(
        searchInput ? searchInput.value : ""
      );

    });

  }


  /* =========================================
     SEARCH MODAL
     ========================================= */

  const openSearch = document.getElementById("openSearch");
  const searchModal = document.getElementById("searchModal");
  const closeSearch = document.getElementById("closeSearch");
  const modalSearchInput =
    document.getElementById("modalSearchInput");
  const modalSearchButton =
    document.getElementById("modalSearchButton");


  function openSearchModal() {

    if (!searchModal) return;

    searchModal.classList.add("show");

    document.body.style.overflow = "hidden";

    setTimeout(() => {

      if (modalSearchInput) {
        modalSearchInput.focus();
      }

    }, 150);

  }


  function closeSearchModal() {

    if (!searchModal) return;

    searchModal.classList.remove("show");

    document.body.style.overflow = "";

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


  if (searchModal) {

    searchModal.addEventListener("click", (event) => {

      if (event.target === searchModal) {
        closeSearchModal();
      }

    });

  }


  if (modalSearchButton) {

    modalSearchButton.addEventListener("click", () => {

      performSearch(
        modalSearchInput
          ? modalSearchInput.value
          : ""
      );

    });

  }


  if (modalSearchInput) {

    modalSearchInput.addEventListener(
      "keydown",
      (event) => {

        if (event.key === "Enter") {

          event.preventDefault();

          performSearch(
            modalSearchInput.value
          );

        }

        if (event.key === "Escape") {
          closeSearchModal();
        }

      }
    );

  }


  /* =========================================
     ESCAPE KEY
     ========================================= */

  document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {

      closeSearchModal();

      if (mobileMenu && menuBtn) {

        mobileMenu.classList.remove("open");
        menuBtn.textContent = "☰";

      }

    }

  });


  /* =========================================
     HORIZONTAL SLIDERS
     ========================================= */

  const sliderContainers =
    document.querySelectorAll(".wallpaper-slider");


  sliderContainers.forEach((slider) => {

    const track =
      slider.querySelector(".wallpaper-track");

    const previous =
      slider.querySelector(".slider-prev");

    const next =
      slider.querySelector(".slider-next");


    if (!track) return;


    function slide(direction) {

      const amount =
        Math.min(
          track.clientWidth * 0.75,
          500
        );

      track.scrollBy({
        left: direction * amount,
        behavior: "smooth"
      });

    }


    if (previous) {

      previous.addEventListener(
        "click",
        () => slide(-1)
      );

    }


    if (next) {

      next.addEventListener(
        "click",
        () => slide(1)
      );

    }


    /* Mouse wheel → horizontal movement */

    track.addEventListener(
      "wheel",
      (event) => {

        if (
          Math.abs(event.deltaY) >
          Math.abs(event.deltaX)
        ) {

          if (
            track.scrollWidth >
            track.clientWidth
          ) {

            event.preventDefault();

            track.scrollLeft +=
              event.deltaY;

          }

        }

      },
      { passive: false }
    );

  });


  /* =========================================
     CATEGORY / FEATURED HORIZONTAL SCROLL
     ========================================= */

  const horizontalSections =
    document.querySelectorAll(
      ".category-strip, .featured-slider"
    );


  horizontalSections.forEach((track) => {

    track.addEventListener(
      "wheel",
      (event) => {

        if (
          Math.abs(event.deltaY) >
          Math.abs(event.deltaX)
        ) {

          if (
            track.scrollWidth >
            track.clientWidth
          ) {

            event.preventDefault();

            track.scrollLeft +=
              event.deltaY;

          }

        }

      },
      { passive: false }
    );

  });


  /* =========================================
     FAVORITES
     ========================================= */

  const favoriteKey =
    "conixenFavorites";


  function getFavorites() {

    try {

      return JSON.parse(
        localStorage.getItem(favoriteKey)
      ) || [];

    } catch (error) {

      return [];

    }

  }


  function saveFavorites(favorites) {

    localStorage.setItem(
      favoriteKey,
      JSON.stringify(favorites)
    );

  }


  function getWallpaperName(card) {

    const title =
      card.querySelector(".wallpaper-info h3");

    return title
      ? title.textContent.trim()
      : "Wallpaper";

  }


  function updateFavoriteButton(button, liked) {

    if (!button) return;

    button.classList.toggle(
      "liked",
      liked
    );

    button.textContent =
      liked ? "♥" : "♡";

    button.style.color =
      liked ? "#ff4f6a" : "";

    button.setAttribute(
      "aria-label",
      liked
        ? "Remove from favorites"
        : "Add to favorites"
    );

  }


  function setupFavorites() {

    const hearts =
      document.querySelectorAll(".heart");

    const favorites =
      getFavorites();


    hearts.forEach((heart, index) => {

      const card =
        heart.closest(".wallpaper-card");

      if (!card) return;


      const name =
        getWallpaperName(card);


      const id =
        name.toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "")
        + "-" +
        index;


      const alreadyLiked =
        favorites.some(
          (item) => item.id === id
        );


      updateFavoriteButton(
        heart,
        alreadyLiked
      );


      heart.addEventListener(
        "click",
        (event) => {

          event.preventDefault();
          event.stopPropagation();


          let current =
            getFavorites();


          const existing =
            current.findIndex(
              (item) => item.id === id
            );


          if (existing >= 0) {

            current.splice(
              existing,
              1
            );

            updateFavoriteButton(
              heart,
              false
            );

          } else {

            current.push({

              id: id,

              name: name,

              category:
                card.querySelector(
                  ".wallpaper-info p"
                )?.textContent
                || "Wallpaper",

              added:
                new Date().toISOString()

            });

            updateFavoriteButton(
              heart,
              true
            );

          }


          saveFavorites(current);


          /* Small visual feedback */

          heart.animate(
            [
              {
                transform: "scale(1)"
              },
              {
                transform: "scale(1.3)"
              },
              {
                transform: "scale(1)"
              }
            ],
            {
              duration: 220
            }
          );

        }
      );

    });

  }


  setupFavorites();


  /* =========================================
     QUICK FILTERS
     ========================================= */

  const filters =
    document.querySelectorAll(
      ".quick-filters button"
    );


  filters.forEach((filter) => {

    filter.addEventListener(
      "click",
      () => {

        const value =
          filter.textContent.trim();

        performSearch(value);

      }
    );

  });


  /* =========================================
     CARD HOVER / REVEAL ANIMATION
     ========================================= */

  const animatedCards =
    document.querySelectorAll(
      ".wallpaper-card, " +
      ".category-card, " +
      ".device-card, " +
      ".featured-item"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(
        (entries) => {

          entries.forEach((entry) => {

            if (
              entry.isIntersecting
            ) {

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


    animatedCards.forEach((card) => {

      observer.observe(card);

    });

  }


  /* =========================================
     YEAR
     ========================================= */

  const yearElements =
    document.querySelectorAll(
      "[data-year]"
    );


  yearElements.forEach((element) => {

    element.textContent =
      new Date().getFullYear();

  });


  const copyright =
    document.querySelector(".copyright");


  if (copyright) {

    copyright.textContent =
      `© ${new Date().getFullYear()} CONIXEN. All rights reserved.`;

  }


  /* =========================================
     ACTIVE NAVIGATION
     ========================================= */

  const currentPage =
    window.location.pathname;


  document.querySelectorAll(
    ".nav-links a, .mobile-menu a"
  ).forEach((link) => {

    const href =
      link.getAttribute("href");

    if (!href) return;


    const linkPage =
      href.split("?")[0];


    if (
      currentPage.endsWith(
        linkPage
      )
    ) {

      link.classList.add(
        "active"
      );

    }

  });


  /* =========================================
     CONIXEN READY
     ========================================= */

  console.log(
    "CONIXEN V3 loaded successfully."
  );

});
