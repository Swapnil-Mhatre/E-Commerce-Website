import { getProducts } from "../api/dataApi.js";
import { displayProducts } from "./products.js";
import { isMobile } from "../utils/responsive.js";

export const handleFilters = async () => {
  const products = await getProducts();
  const productPage = document.querySelector(".products-section .wrapper");
  const categoryList = document.querySelector(".category-name-list");
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const filterCatBtn = document.querySelector(".filter-category");
  const filterSection = document.querySelector(".filter-section");

  let isFilterOpen = false;
  let selectedCategory = category;
  let selectedPrice = Infinity;

  if (categoryList) {
    let uniqueCategory = products.map((product) => product.category);
    uniqueCategory = [...new Set(uniqueCategory)];
    uniqueCategory.map((category) => {
      categoryList.innerHTML += `<li>${category}</li>`;
    });

    categoryList.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      const clearBtn = e.target.closest(".clear-filter");

      if (li) {
        selectedCategory = li.innerText;
        history.pushState({}, "", `Products.html?category=${li.innerText}`);
        applyFilters();
      }

      if (clearBtn) {
        selectedCategory = "";
        selectedPrice = Infinity;
        displayProducts(products, productPage, "product");
        history.pushState({}, "", "Products.html");
        clearBtn.remove();
        document.querySelector("#price-filter").value = "";
        document.querySelector("#value").innerText = "∞";
      }
    });
  }

  function applyFilters() {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter((p) => p.category === selectedCategory);
    }

    if (selectedPrice !== Infinity) {
      filtered = filtered.filter((p) => p.price <= selectedPrice);
    }

    if (filtered.length === 0) {
      productPage.innerHTML = `<div class="emptyDiv">Nothing to be appeared here</div>`;
      return;
    }

    displayProducts(filtered, productPage, "product");

    if (
      !categoryList.querySelector(".clear-filter") &&
      (filtered.length !== products.length ||
        selectedCategory ||
        selectedPrice !== Infinity)
    ) {
      categoryList.insertAdjacentHTML(
        "beforeend",
        `
        <button class="clear-filter">
          <span>Clear Filter</span>
          <i class="ri-close-line"></i>
        </button>
      `,
      );
    }
  }

  function openFilters() {
    filterCatBtn.addEventListener("click", () => {
      if (isFilterOpen === false) {
        filterCatBtn.textContent = "Close Filter";
        filterSection.removeAttribute("hidden");
        isFilterOpen = true;
      } else {
        filterCatBtn.textContent = "Open Filter";
        filterSection.setAttribute("hidden", "");
        isFilterOpen = false;
      }
    });
  }

  function checkWidth() {
    if (isMobile()) {
      filterCatBtn.removeAttribute("hidden");
      filterSection.setAttribute("hidden", "");
    } else {
      filterSection.removeAttribute("hidden");
      filterCatBtn.setAttribute("hidden", "");
      isFilterOpen = false;
    }
  }

  function changePriceSlider() {
    const priceRange = document.querySelector("#price-filter");
    const priceValue = document.querySelector("#value");

    priceRange.addEventListener("change", (e) => {
      selectedPrice = parseInt(e.target.value);
      priceValue.innerText = selectedPrice;
      applyFilters();
    });
  }

  if (filterCatBtn) {
    openFilters();
    window.addEventListener("resize", checkWidth);
    window.onload = checkWidth();
  }

  if (productPage) {
    applyFilters();
    changePriceSlider();
  }
};
