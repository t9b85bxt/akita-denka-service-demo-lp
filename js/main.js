/* ============================================================
   秋田電化サービス デモサイト / main.js
   - セクション単位（.reveal）でのライズアニメーション
   - モバイルナビの開閉
   ============================================================ */

(function () {
  "use strict";

  /* ---- モバイルナビ開閉 ---- */
  var navToggle = document.getElementById("navToggle");
  var mainNav = document.getElementById("mainNav");
  var navToggleIcon = document.getElementById("navToggleIcon");

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = mainNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
      navToggleIcon.innerHTML = isOpen
        ? '<use href="#i-close"></use>'
        : '<use href="#i-menu"></use>';
    });

    mainNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        mainNav.classList.remove("is-open");
        navToggle.setAttribute("aria-expanded", "false");
        navToggleIcon.innerHTML = '<use href="#i-menu"></use>';
      });
    });
  }

  /* ---- リビールアニメーション ----
     各セクションのまとまり（.reveal）が画面に入ったら
     ブロックごと一括でふわっと立ち上がる。
     個々のカード／FAQ項目単位では発火させない。 */
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -8% 0px",
      threshold: 0.12,
    }
  );

  revealEls.forEach(function (el) {
    observer.observe(el);
  });
})();
