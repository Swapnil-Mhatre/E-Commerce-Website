import { getProductCategoryPath } from "../utils/paths.js";

const scrolltoTop = () => {
  const backToTopButton = document.getElementById("backToTop");

  if (backToTopButton) {
    backToTopButton.addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    });
  }
};
scrolltoTop();

const createFooterStructure = () => {
  const footer = document.querySelector("footer");
  let clutter = `
  <div class="about">
      <div class="logo">Fashion Plays</div>
      <div class="description">We Design and Best and Quality Products with the moto of utilization of the resource well</div>
  </div>
  <div class="categories">
      <h2>Category</h2>
      <ul>
          <li><a href="${getProductCategoryPath("Men")}">Men</a></li>
          <li><a href="${getProductCategoryPath("Women")}">Women</a></li>
          <li><a href="${getProductCategoryPath("Kids")}">Kids</a></li>
          <li><a href="${getProductCategoryPath("Bags")}">Bags</a></li>
          <li><a href="${getProductCategoryPath("Footwears")}">Footwears</a></li>
          <li><a href="${getProductCategoryPath("Watches")}">Watches</a></li>
      </ul>
  </div>
  <div class="contact-dets">
      <h2>Get in Touch</h2>
      <p>Any Query ? Email us at <br> fashionplays@gmail.com or <br> contact us at +91 9983274619</p>
  </div>
  <span class="up-btn"><a href="#" id="backToTop"><i class="ri-arrow-up-s-line"></i></a></span>
  `;
  footer.innerHTML = clutter;
};
createFooterStructure();
