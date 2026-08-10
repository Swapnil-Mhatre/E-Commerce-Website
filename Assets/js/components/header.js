import { searchProduct } from "../search/search.js";
import { isMobile } from "../utils/responsive.js";

const handleNav = async () => {
  const handleSearchInputs = await searchProduct();
  const searchBoxes = document.querySelectorAll(".search-box");
  const hambergerIconCon = document.querySelector(".hamberger-menu-icon");
  const hambergerIcon = document.querySelector(".hamberger-menu-icon>i");
  const hambergerCon = document.querySelector(".hamberger-menu");
  const closeMenuIcon = document.querySelector(".hamberger-menu ul>div");

  function highlightSection() {
    document.addEventListener("DOMContentLoaded", () => {
      const menuLinks = document.querySelectorAll(".menu-mid li a");

      menuLinks.forEach((link) => {
        if (link.href === window.location.href) {
          link.classList.add("bold");
        }
      });
    });
  }
  highlightSection();

  if (searchBoxes) {
    handleSearchInputs();
  }

  (function handleMenu() {
    const menuLists = document.querySelectorAll(".menu-list");
    hambergerIcon.addEventListener("click", () => {
      hambergerCon.classList.add("translate");
    });
    closeMenuIcon.addEventListener("click", () => {
      hambergerCon.classList.remove("translate");
    });

    function checkWidth() {
      if (isMobile()) {
        hambergerIconCon.removeAttribute("hidden");
        menuLists.forEach((menuList) => {
          menuList.setAttribute("hidden", "");
        });
      } else {
        hambergerIconCon.setAttribute("hidden", "");
        menuLists.forEach((menuList) => {
          menuList.removeAttribute("hidden");
        });
      }
    }

    window.addEventListener("resize", () => checkWidth());

    window.onload = checkWidth();
  })();
};
handleNav();
