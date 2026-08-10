import { getCategory } from "../api/dataApi.js";

const handleCategories = async () => {
  const categoryCon = document.querySelector(".category-section .wrapper");
  const categories = await getCategory();

  function displayCategory(categories) {
    let clutter = "";
    categories.map((category) => {
      clutter += `
        <a href="Products.html?category=${category.title}" class="category-card">
            <div class="category-image">
                <img src=${category.imageUrl} alt="">
            </div>
            <h2 class="category-title">${category.title}</h2>
            <p class="description">${category.description}</p>
        </a>`;
    });
    categoryCon.innerHTML = clutter;
  }
  if (categoryCon) displayCategory(categories);
};
handleCategories();
