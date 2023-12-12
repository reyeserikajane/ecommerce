let search = document.querySelector(".search");

document.querySelector("#search-icon").onclick = () => {
  search.classList.toggle("active");
};

document.addEventListener("DOMContentLoaded", function () {
  let cartCount = 0;
  const cartCountElement = document.getElementById("cart-count");
  const cartItems = [];
  const cartItemsList = document.getElementById("cart-items-list");
  const cartTotalElement = document.getElementById("cart-total");

  function updateCartCount() {
    cartCountElement.textContent = cartCount;
  }

  function addToCart(name, price, imgSrc) {
    let found = cartItems.find((item) => item.name === name);
    if (found) {
      found.quantity++;
    } else {
      cartItems.push({ name, price, imgSrc, quantity: 1 });
    }
    cartCount++;
    updateCartCount();
    updateCart();
  }

  function updateItemQuantity(index, newQuantity) {
    if (newQuantity > 0) {
      cartItems[index].quantity = newQuantity;
    } else {
      cartItems[index].quantity = 1;
    }
    updateCart();
  }

  function updateCart() {
    cartItemsList.innerHTML = "";
    let cartTotal = 0;

    cartItems.forEach(function (item, index) {
      const section = document.createElement("div");
      section.classList.add("cart-item-grid");

      // Image and Details Container
      const imgAndDetailsDiv = document.createElement("div");
      const img = document.createElement("img");
      img.src = item.imgSrc;
      img.alt = item.name;
      img.classList.add("cart-item-image");
      imgAndDetailsDiv.classList.add("cart-item-details");

      imgAndDetailsDiv.appendChild(img);

      const detailsDiv = document.createElement("div");
      const itemName = document.createElement("div");
      itemName.textContent = item.name;
      itemName.classList.add("cart-item-name");
      detailsDiv.appendChild(itemName);

      const itemPrice = document.createElement("div");
      itemPrice.textContent = `$${item.price.toFixed(2)}`;
      itemPrice.classList.add("cart-item-price");
      detailsDiv.appendChild(itemPrice);

      imgAndDetailsDiv.appendChild(detailsDiv);
      section.appendChild(imgAndDetailsDiv);

      // Quantity Input
      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.min = "1";
      quantityInput.value = item.quantity;
      quantityInput.classList.add("cart-item-quantity");
      quantityInput.addEventListener("change", (e) => {
        const newQuantity = parseInt(e.target.value, 10);
        updateItemQuantity(index, newQuantity);
      });
      section.appendChild(quantityInput);

      // Total Price
      const totalPriceDiv = document.createElement("div");
      const totalText = document.createElement("span");
      totalText.textContent = "Total: ";
      totalPriceDiv.appendChild(totalText);

      const totalItemPrice = document.createElement("span");
      totalItemPrice.textContent = `$${(item.price * item.quantity).toFixed(
        2,
      )}`;
      totalItemPrice.classList.add("cart-item-total-price");
      totalPriceDiv.appendChild(totalItemPrice);

      section.appendChild(totalPriceDiv);

      cartItemsList.appendChild(section);

      cartTotal += item.price * item.quantity;
    });

    // Clear the existing content of cartTotalElement
    cartTotalElement.innerHTML = "";

    // Create new elements for displaying the total price
    const totalDiv = document.createElement("div");
    totalDiv.classList.add("cart-total-div");
    const totalP = document.createElement("p");
    totalP.textContent = "Total";
    const totalSpan = document.createElement("span");
    totalSpan.classList.add("cart-total-price");

    totalP.classList.add("cart-total-text");
    totalSpan.textContent = ` $${cartTotal.toFixed(2)}`;

    // Append the p and span to the div
    totalDiv.appendChild(totalSpan);

    totalDiv.appendChild(totalP);

    // Append the new div to the cartTotalElement
    cartTotalElement.appendChild(totalDiv);
  }

  const addToCartButtons = document.querySelectorAll(".add-button");

  const customPopup = document.getElementById("customPopup");
  const customPopupMessage = document.getElementById("customPopupMessage");
  const customPopupClose = document.querySelector(".custom-popup-close");

  addToCartButtons.forEach(function (button) {
    button.addEventListener("click", function () {
      const productItem = button.closest(".product-item");
      const productNameElement = productItem.querySelector(".product-name");
      const productPriceElement = productItem.querySelector(".product-price");
      const productImageElement = productItem.querySelector(".product-image");

      if (productNameElement && productPriceElement && productImageElement) {
        const productName = productNameElement.textContent;
        const productPrice = parseFloat(
          productPriceElement.textContent.replace(/[^0-9.]/g, ""),
        );
        const productImgSrc = productImageElement.src;
        addToCart(productName, productPrice, productImgSrc);

        // Clear the existing content of the popup message
        customPopupMessage.innerHTML = "";

        // Create icon element
        const successIcon = document.createElement("i");
        successIcon.className = "fa-regular fa-circle-check";

        // Add icon to the popup message
        customPopupMessage.appendChild(successIcon);

        // Create text node and append it to the popup message
        const messageText = document.createTextNode(
          ` Added ${productName} to cart`,
        );
        customPopupMessage.appendChild(messageText);

        customPopup.style.display = "flex";
      } else {
        // Show custom popup for error
        customPopupMessage.textContent = "Product elements not found";
        customPopup.style.display = "flex";
      }
    });
  });

  // Close the custom popup when the close button is clicked
  customPopupClose.addEventListener("click", function () {
    customPopup.style.display = "none";
  });

  // Close the custom popup when clicking outside of it
  window.addEventListener("click", function (event) {
    if (event.target === customPopup) {
      customPopup.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Add event listener to the cart icon to show the cart
  const cartIcon = document.querySelector(".fa-cart-shopping");
  const cartContainer = document.getElementById("cart-container");
  cartIcon.addEventListener("click", function () {
    cartContainer.classList.toggle("show-cart");
  });

  // Add event listener to the close button to hide the cart
  const closeCartButton = document.querySelector(".close-cart");
  closeCartButton.addEventListener("click", function () {
    cartContainer.classList.toggle("show-cart");
  });

  window.addEventListener("click", function (event) {
    // Check if the click is outside the cartContainer and the cart is visible
    if (
      !cartContainer.contains(event.target) &&
      !cartIcon.contains(event.target) &&
      cartContainer.classList.contains("show-cart")
    ) {
      cartContainer.classList.remove("show-cart");
    }
  });
});

// Login and Register
var loginModal = document.getElementById("loginModal");
var registerModal = document.getElementById("registerModal");
var loginBtn = document.querySelector(".login_btn");
var registerBtn = document.querySelector(".register_btn");
var closeButtons = document.getElementsByClassName("close");

loginBtn.onclick = function () {
  loginModal.style.display = "flex";
};

registerBtn.onclick = function () {
  registerModal.style.display = "flex";
};

Array.from(closeButtons).forEach(function (element) {
  element.onclick = function () {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  };
});

// Close Modal If Outside Click
window.onclick = function (event) {
  if (event.target == loginModal || event.target == registerModal) {
    loginModal.style.display = "none";
    registerModal.style.display = "none";
  }
};
