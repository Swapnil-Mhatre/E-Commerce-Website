import { searchProduct } from "../search/search.js";
import { getHomepagePath, getPageLinksPath } from "../utils/paths.js";
import { isMobile } from "../utils/responsive.js";

const handleNav = async () => {
  const handleSearchInputs = await searchProduct();
  const searchBoxes = document.querySelectorAll(".search-box");
  const hambergerIconCon = document.querySelector(".hamberger-menu-icon");
  const hambergerIcon = document.querySelector(".hamberger-menu-icon>i");
  const hambergerCon = document.querySelector(".hamberger-menu");
  const closeMenuIcon = document.querySelector(".hamberger-menu ul>div");

  function highlightSection() {
    const menuLinks = document.querySelectorAll(".menu-mid li a");

    menuLinks.forEach((link) => {
      if (link.href === window.location.href) {
        link.classList.add("bold");
      }
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

const createHeaderStruture = () => {
  const header = document.querySelector("header");
  let clutter = `
  <nav class="navbar">
    <div class="hamberger-menu-icon" hidden>
        <i class="ri-menu-line"></i>
        <div class="hamberger-menu">
            <ul>
                <a href="${getHomepagePath()}" class="logo">Fashion Plays</a>
                <div><i class="ri-close-line"></i></div>
                <li class="search-field">
                    <label for="search" class="search-label">
                        <i class="ri-search-line"></i>
                    </label>
                    <input type="text" class="search-box" name="search" placeholder="Search Products here">
                    <div class="search-list">
                    </div>
                </li>
                <li><a href="${getPageLinksPath("Products")}">Products</a></li>
                <li><a href="${getPageLinksPath("Category")}">Category</a></li>
                <li><a href="${getPageLinksPath("About-Us")}">About Us</a></li>
                <li><a href="${getPageLinksPath("Contact")}">Contact Us</a></li>
                <li><a href="${getPageLinksPath("Cart")}"><i class="ri-shopping-cart-line"></i> Shopping Cart</a></li>
            </ul>
        </div>
    </div>
    <a href="${getHomepagePath()}" class="logo">Fashion Plays</a>
    <div class="menu-list">
        <ul class="menu-mid">
            <li><a href="${getPageLinksPath("Products")}">Products</a></li>
            <li><a href="${getPageLinksPath("Category")}">Category</a></li>
            <li><a href="${getPageLinksPath("About-Us")}">About Us</a></li>
            <li><a href="${getPageLinksPath("Contact")}">Contact Us</a></li>
        </ul>
    </div>
    <div class="menu-list">
        <ul class="menu-right">
            <li class="search-field">
                <label for="search" class="search-label">
                    <i class="ri-search-line"></i>
                </label>
                <input type="text" class="search-box" name="search" placeholder="Search Products here">
                <div class="search-list">
                </div>
            </li>
            <li><a href="${getPageLinksPath("Cart")}"><i class="ri-shopping-cart-line"></i></a></li>
        </ul>
    </div>
  </nav>`;
  header.innerHTML = clutter;
};
createHeaderStruture();
