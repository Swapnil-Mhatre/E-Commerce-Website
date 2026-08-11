import { getProducts } from "../api/dataApi.js";
import { addRating, checkpage, handleCartClick } from "./productUtil.js";

export function displayProducts(filteredProductsList, container, page) {
  let clutter = "";
  filteredProductsList.map((product) => {
    let ratingFill = addRating(product);
    clutter += `
      <a href=${checkpage(page, product.id)} class="product-card">
          <div class="product-image">
              <img src=${product.imageUrl} alt="">
          </div>
          <div class="content">
              <h2 class="product-title">${product.productTitle}</h2>
              <div class="product-rating">${ratingFill}</div>
              <div class="btm-info">
                  <h3 class="product-price">Rs. ${product.price}</h3>
                  <div class="colors">
                      <div class="color" id="red"></div>
                      <div class="color" id="green"></div>
                      <div class="color" id="blue"></div>
                  </div>
              </div>
          </div>
      </a>
      `;
  });
  container.innerHTML = clutter;
}

async function displayProductDetail() {
  const products = await getProducts();
  const productDetailSec = document.querySelector(".product-details-section");
  const relatedProductCon = document.querySelector(".related-product");
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  
  let productDetail;

  if (products) {
    productDetail = products.find((product) => product.id == id);
  }

  if (productDetailSec) {
    const similarProduct = products.filter(
      (product) =>
        productDetail.category == product.category &&
        productDetail.id !== product.id,
    );
    displayProducts(similarProduct, relatedProductCon, "product");
    let ratingFill = addRating(productDetail);
    productDetailSec.insertAdjacentHTML(
      "afterbegin",
      `
        <div class="product-details">
            <div class="image-con">
                <img src=${productDetail.imageUrl} alt="">
            </div>
            <div class="product-content">
                <h1 class="prouduct-title">${productDetail.productTitle}</h1>
                <div class="product-rating">${ratingFill}</div>
                <h3 class="product-price">₹ ${productDetail.price}</h3>
                <p class="product-description">${productDetail.description}</p>
                <button class="add-to-cart-btn" id="addToCart">Add To Cart</button>
            </div>
        </div>`,
    );
    let addToCartBtn = document.querySelector("#addToCart");
    handleCartClick(addToCartBtn);
  }
}
displayProductDetail();
