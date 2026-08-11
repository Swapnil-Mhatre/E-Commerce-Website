export function addRating(product) {
  let ratings = product.ratings;
  let ratingFill = "";
  for (let i = 1; i <= 5; i++) {
    if (ratings) {
      ratingFill += `<i class="ri-star-fill"></i>`;
      ratings--;
    } else {
      ratingFill += `<i class="ri-star-line"></i>`;
    }
  }
  return ratingFill;
}

export function checkpage(page, productId) {
  if (page === "home") {
    return `./Assets/pages/Product-details.html?id=${productId}`;
  }
  if (page === "product") {
    return `Product-details.html?id=${productId}`;
  }
}

export function handleCartClick(addToCartBtn, productDetail) {
  const addedProduct = JSON.parse(localStorage.getItem("AddedProduct")) || [];
  addToCartBtn.addEventListener("click", () => {
    const existingProduct = addedProduct.find(
      (product) => product.id === productDetail.id,
    );

    if (existingProduct) {
      existingProduct.quantity += 1;
      existingProduct.totalPrice =
        existingProduct.price * existingProduct.quantity;
    } else {
      const productCartDetail = {
        id: productDetail.id,
        productTitle: productDetail.productTitle,
        imageUrl: productDetail.imageUrl,
        price: productDetail.price,
        quantity: 1,
        totalPrice: productDetail.price,
        size: "M",
        isAddedToCart: true,
      };
      addedProduct.push(productCartDetail);
    }
    localStorage.setItem("AddedProduct", JSON.stringify(addedProduct));
  });
}
