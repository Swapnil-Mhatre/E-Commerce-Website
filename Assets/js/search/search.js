import { getProducts } from "../api/dataApi.js";
import { getProductDetailsPath } from "../utils/paths.js";

export const searchProduct = async () => {
  const searchBoxes = document.querySelectorAll(".search-box");
  const listProducts = await getProducts();
  let isOpen = false;

  function handleSearchInputs() {
    searchBoxes.forEach((searchBox) => {
      const searchList = searchBox.parentElement.querySelector(".search-list");

      searchBox.addEventListener("input", (e) => {
        clutterProduct(listProducts, e, searchList);
      });

      document.addEventListener("click", (e) => {
        const clickedInside =
          searchBox.contains(e.target) || searchList.contains(e.target);

        if (!clickedInside && isOpen) {
          searchList.classList.remove("searched-items");
          searchList.innerHTML = "";
          searchBox.value = "";
          isOpen = false;
        }
      });
    });
  }

  function clutterProduct(products, dets, searchList) {
    const searchValue = dets.target.value.trim().toLowerCase();

    if (searchValue === "") {
      searchList.innerHTML = "";
      searchList.classList.remove("searched-items");
      isOpen = false;
      return;
    }

    const searchProduct = products.filter((product) =>
      product.productTitle.toLowerCase().includes(searchValue),
    );

    if (searchProduct.length > 0) {
      let clutter = "";
      searchProduct.forEach((product) => {
        const link = getProductDetailsPath(product.id);
        clutter += `<a href="${link}">${product.productTitle}</a>`;
      });
      searchList.innerHTML = clutter;
      searchList.classList.add("searched-items");
      isOpen = true;
    } else {
      searchList.innerHTML = "";
      searchList.classList.remove("searched-items");
      isOpen = false;
    }
  }

  return handleSearchInputs;
};
