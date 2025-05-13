const handleNav = async () => {
  const searchBoxes = document.querySelectorAll(".search-box");
  const hambergerIconCon = document.querySelector(".hamberger-menu-icon");
  const hambergerIcon = document.querySelector(".hamberger-menu-icon>i");
  const hambergerCon = document.querySelector(".hamberger-menu");
  const closeMenuIcon = document.querySelector(".hamberger-menu ul>div");
  let isOpen = false;

  const listProducts = await fetch("./Assets/links/ProductData.json")
    .then((response) => response.json())
    .then((productData) => productData)
    .catch((err) => console.log(err));

  const listProducts2 = await fetch("../links/ProductData.json")
    .then((response) => response.json())
    .then((productData) => productData)
    .catch((err) => console.log(err));

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

  function clutterProduct(products, dets, searchList, val) {
    const searchProduct = products.filter((product) =>
      product.productTitle
        .toLowerCase()
        .includes(dets.target.value.toLowerCase())
    );
    if (searchProduct.length > 0) {
      let clutter = "";
      searchProduct.forEach((product) => {
        const link =
          val === 1
            ? `./Assets/pages/Product-details.html?id=${product.id}`
            : `./Product-details.html?id=${product.id}`;
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

  function handleSearchInputs() {
    searchBoxes.forEach((searchBox) => {
      const searchList = searchBox.parentElement.querySelector(".search-list");

      searchBox.addEventListener("input", (e) => {
        if (listProducts) clutterProduct(listProducts, e, searchList, 1);
        if (listProducts2) clutterProduct(listProducts2, e, searchList, 2);
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

  if (searchBoxes) {
    handleSearchInputs();
  }

  function handleMenu() {
    const menuLists = document.querySelectorAll(".menu-list");
    hambergerIcon.addEventListener("click", () => {
      hambergerCon.classList.add("translate");
    });
    closeMenuIcon.addEventListener("click", () => {
      hambergerCon.classList.remove("translate");
    });

    function checkWidth() {
      if (window.innerWidth >= 495) {
        hambergerIconCon.setAttribute("hidden", "");
        menuLists.forEach((menuList) => {
          menuList.removeAttribute("hidden");
        });
      }
      if (window.innerWidth <= 495) {
        hambergerIconCon.removeAttribute("hidden");
        menuLists.forEach((menuList) => {
          menuList.setAttribute("hidden", "");
        });
      }
    }

    window.addEventListener("resize", () => checkWidth());

    window.onload(checkWidth());
  }
  handleMenu();
};
handleNav();

const handleSlides = () => {
  const slides = document.querySelector(".slides");
  const arrows = document.querySelectorAll(".arrows i");
  let sliderTime = 7000;
  if (slides) {
    setInterval(() => {
      forward();
    }, sliderTime);
  }

  const sliderData = [
    {
      title: "Occational Clothes",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero culpa sed facilis cupiditate quod eligendi ipsa nisi dolore debitis eveniet.",
      imgUrl: "./Assets/Images/Slides/Occational_Clothes.jpg",
    },
    {
      title: "Latest Trends",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero culpa sed facilis cupiditate quod eligendi ipsa nisi dolore debitis eveniet.",
      imgUrl: "./Assets/Images/Slides/Latest_Trends.avif",
    },
    {
      title: "Bags and Purses",
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vero culpa sed facilis cupiditate quod eligendi ipsa nisi dolore debitis eveniet.",
      imgUrl: "./Assets/Images/Slides/Bags.avif",
    },
  ];
  let clutter = "";
  if (slides) {
    sliderData.forEach((slide, idx) => {
      clutter += `
            <div class="slide" id=${idx}>
                <img src=${slide.imgUrl} alt="">
                <div class="description">
                    <h2>${slide.title}</h2>
                    <p>${slide.description}</p>
                    <button>Shop Now</button>
                </div>
            </div>`;
      slides.innerHTML = clutter;
    });
  }

  function forward() {
    const newSlides = document.querySelectorAll(".slide");
    slides.appendChild(newSlides[0]);
  }

  function backward() {
    const newSlides = document.querySelectorAll(".slide");
    let lastSlidePos = newSlides.length - 1;
    slides.prepend(newSlides[lastSlidePos]);
  }

  arrows.forEach((arrow) => {
    arrow.addEventListener("click", (e) =>
      e.target.id === "forward" ? forward() : backward()
    );
  });
};
handleSlides();

const handleTestimonials = () => {
  const testimonialCardsCon = document.querySelector(".testimonial-cards");

  if (testimonialCardsCon) {
    setInterval(() => {
      slideCards();
    }, 5000);
  }

  function slideCards() {
    const testimonialCards = document.querySelectorAll(".testimonial-card");
    testimonialCardsCon.appendChild(testimonialCards[0]);
  }
};
handleTestimonials();

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

const handleProductsDisplay = async () => {
  const productPage = document.querySelector(".products-section .wrapper");
  const latestProductsCon = document.querySelector(".products .wrapper");
  const categoryList = document.querySelector(".category-name-list");
  let addToCartBtn;
  let productDetail;
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category");
  const id = params.get("id");
  const products = await fetch("../links/ProductData.json")
    .then((response) => response.json())
    .then((productData) => productData)
    .catch((err) => console.error(err));

  if (latestProductsCon) {
    const latestProducts = await fetch("./Assets/links/LatestProducts.json")
      .then((response) => response.json())
      .then((latestProductsData) => latestProductsData)
      .catch((err) => console.log(err));
    displayProducts(latestProducts, latestProductsCon, "home");
  }

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

  let selectedCategory;
  let selectedPrice = Infinity;
  selectedCategory = category;

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
      `
      );
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

  function addRating(product) {
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

  function checkpage(page, productId) {
    if (page === "home") {
      return `./Assets/pages/Product-details.html?id=${productId}`;
    }
    if (page === "product") {
      return `Product-details.html?id=${productId}`;
    }
  }

  function displayProducts(filteredProductsList, container, page) {
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

  function displayProductDetail() {
    if (products) {
      productDetail = products.find((product) => product.id == id);
    }
    const productDetailSec = document.querySelector(".product-details-section");
    const relatedProductCon = document.querySelector(".related-product");

    if (productDetailSec) {
      const similarProduct = products.filter(
        (product) =>
          productDetail.category == product.category &&
          productDetail.id !== product.id
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
        </div>`
      );
      addToCartBtn = document.querySelector("#addToCart");
      handleCartClick();
    }
  }

  function handleCartClick() {
    const addedProduct = JSON.parse(localStorage.getItem("AddedProduct")) || [];
    addToCartBtn.addEventListener("click", () => {
      const existingProduct = addedProduct.find(
        (product) => product.id === productDetail.id
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

  if (productPage) {
    applyFilters();
    changePriceSlider();
  }
  displayProductDetail();
};
handleProductsDisplay();

const handleCategories = async () => {
  const categoryCon = document.querySelector(".category-section .wrapper");
  const categories = await fetch("../links/Categories.json")
    .then((response) => response.json())
    .then((categoryData) => categoryData)
    .catch((err) => console.error(err));

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

const handleCartSection = () => {
  const cartContainer = document.querySelector(".cart-section .wrapper");
  const cartProductListCon = document.createElement("div");
  const billingSummaryCon = document.createElement("div");
  let cartItems = JSON.parse(localStorage.getItem("AddedProduct")) || [];

  cartProductListCon.classList.add("cart-product");
  billingSummaryCon.classList.add("billing");

  function emptyDiv() {
    if (cartItems.length === 0 && cartContainer) {
      cartContainer.innerHTML = `<div class="emptyDiv">Nothing to Be Appeared here try Shopping the Product</div>`;
    }
  }

  function displayCart() {
    let cartClutter = "";
    let summaryClutter = "";
    let TotalBill = 0;

    cartItems.map((cartItem) => {
      cartClutter += `
        <div class="cart-product-card" id=${cartItem.id}>
            <div class="product-image">
                <img src=${cartItem.imageUrl} alt="">
            </div>
            <div class="content">
                <h2 class="product-title">${cartItem.productTitle}</h2>
                <div class="product-quantity">
                <button class="decrement"><i class="ri-subtract-line"></i></button>
                <h3 class="quantity">${cartItem.quantity}</h3>
                <button class="increment"><i class="ri-add-line"></i></button>
                </div>
                <div class="product-size">${cartItem.size}</div>
                <div class="product-price">₹ ${cartItem.totalPrice}</div>
                <button class="remove-item"><i class="ri-delete-bin-line"></i> Remove Item</button>
            </div>
        </div>`;

      summaryClutter += `
        <div class="summary">
            <h3 class="product-title">${cartItem.productTitle}</h3>
            <div class="quantity">x${cartItem.quantity}</div>
            <div class="product-price">₹ ${cartItem.totalPrice}</div>
        </div>
        `;

      TotalBill += parseInt(cartItem.totalPrice);
    });

    let billingSummaryClutter = `
        ${addbillingSummary()}
        <a href="./Checkout.html" class="checkout-page">Go to Checkout</a>`;

    function addbillingSummary() {
      return `<h2>Order Summary</h2>
        <div class="summary-list">
        </div>
        <div class="total-amount">
            <h3>Total amount</h3>
            <h4>₹ ${TotalBill}</h4>
        </div>`;
    }

    cartProductListCon.innerHTML = cartClutter;
    cartContainer.appendChild(cartProductListCon);
    billingSummaryCon.innerHTML = billingSummaryClutter;
    cartContainer.appendChild(billingSummaryCon);

    const summaryList = document.querySelector(".summary-list");
    summaryList.innerHTML = summaryClutter;
    changeQuantity();
    removeItem();
    emptyDiv();
  }

  if (cartContainer && cartItems.length !== 0) {
    displayCart();
  }

  let newCartItems = [];
  function handleQuantity(productId, sign) {
    newCartItems = cartItems.map((cartItem) => {
      if (cartItem.id === productId) {
        let newQuantity = cartItem.quantity;
        if (sign === "add") newQuantity += 1;
        if (sign === "subtract") newQuantity -= 1;

        return {
          ...cartItem,
          quantity: newQuantity,
          totalPrice: cartItem.price * newQuantity,
        };
      }
      return cartItem;
    });

    newCartItems = newCartItems.filter((cartItem) => cartItem.quantity > 0);
    localStorage.setItem("AddedProduct", JSON.stringify(newCartItems));
    cartItems = newCartItems;
    displayCart();
  }

  function changeQuantity() {
    const quantityCon = document.querySelectorAll(".product-quantity");
    quantityCon.forEach((container) => {
      container.addEventListener("click", (e) => {
        const buttons = e.target.closest("button");
        if (buttons) {
          const productCardId = parseInt(
            buttons.closest(".cart-product-card").id
          );
          if (e.target.className === "ri-add-line") {
            handleQuantity(productCardId, "add");
          }
          if (e.target.className === "ri-subtract-line") {
            handleQuantity(productCardId, "subtract");
          }
        }
      });
    });
  }

  function removeItem() {
    const removeBtn = document.querySelectorAll(".remove-item");
    removeBtn.forEach((button) => {
      button.addEventListener("click", (e) => {
        const productCardId = parseInt(
          e.target.closest(".cart-product-card").id
        );
        newCartItems = cartItems.filter(
          (cartItem) => cartItem.id !== productCardId
        );
        cartItems = newCartItems;
        localStorage.setItem("AddedProduct", JSON.stringify(newCartItems));
        displayCart();
      });
    });
  }
  emptyDiv();
};
handleCartSection();

const handleCheckoutSection = () => {
  function displayBilling() {
    const totalAmount = document.querySelector(".billing #total-bill");
    const summaryList = document.querySelector(".summary-list");
    let cartItems = JSON.parse(localStorage.getItem("AddedProduct")) || [];
    let summaryClutter = "";
    let TotalBill = 0;
    cartItems.map((cartItem) => {
      summaryClutter += `
              <div class="summary">
                  <h3 class="product-title">${cartItem.productTitle}</h3>
                  <div class="quantity">x${cartItem.quantity}</div>
                  <div class="product-price">₹ ${cartItem.totalPrice}</div>
              </div>
              `;

      TotalBill += parseInt(cartItem.totalPrice);
    });
    if (totalAmount && summaryList) {
      summaryList.innerHTML = summaryClutter;
      totalAmount.textContent = `₹ ${TotalBill}`;
    }
  }
  displayBilling();

  function handleFormContent() {
    const confirmationForm = document.querySelector("#confirmation-form");

    if (confirmationForm) {
      confirmationForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const form = e.target;
        const inputFields = form.querySelectorAll("input[required]");
        let allFilled = true;
        inputFields.forEach((inputField) => {
          if (inputField.id === "email-address")
            localStorage.setItem("userEmail", JSON.stringify(inputField.value));
          if (!inputField.value.trim()) {
            allFilled = false;
          }
        });

        if (allFilled) {
          window.location.href = "OrderConfirmation.html";
        }
      });
    }
  }
  handleFormContent();

  function submittionConfirmation() {
    const orderConfirmationCon = document.querySelector(
      ".order-confirmation .wrapper"
    );
    const emailCon = document.querySelector("#emailAddress");
    const orderIdCon = document.querySelector("#orderId");
    const orderStatusCon = document.querySelector(".orderStatus");
    const emailAddress = JSON.parse(localStorage.getItem("userEmail"));

    if (orderConfirmationCon) {
      emailCon.textContent = emailAddress;

      function randomId() {
        return Math.floor(Math.random() * 9999) + 1000;
      }

      orderIdCon.textContent = randomId();

      setTimeout(() => {
        orderStatusCon.textContent = "succced";
        localStorage.removeItem("AddedProduct");
      }, 1000);
    }
  }
  submittionConfirmation();
};
handleCheckoutSection();
