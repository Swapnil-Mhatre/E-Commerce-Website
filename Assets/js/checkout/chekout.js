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
