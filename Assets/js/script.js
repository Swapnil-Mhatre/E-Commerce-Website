import "./components/header.js";
import "./components/footer.js";
import "./components/homepage.js";
import "./components/aboutpage.js";
import "./components/categorypage.js";
import { handleFilters } from "./products/filters.js";

handleFilters();

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
            buttons.closest(".cart-product-card").id,
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
          e.target.closest(".cart-product-card").id,
        );
        newCartItems = cartItems.filter(
          (cartItem) => cartItem.id !== productCardId,
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
      ".order-confirmation .wrapper",
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
