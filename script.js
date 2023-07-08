// Products
const products = [
  {
    id: 1,
    name: "Carrot",
    price: 10.99,
    image: "./images/carrot.jpg",
  },
  {
    id: 2,
    name: "Pumpkin",
    price: 5.99,
    image: "./images/images1.jpeg",
  },
  {
    id: 3,
    name: "Tomato",
    price: 7.99,
    image: "./images/tomato.jpg",
  },
];

// Shopping Cart
let cartItems = [];

// Add to Cart event listeners
document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("product-list");
  products.forEach((product) => {
    const productItem = document.createElement("div");
    productItem.classList.add("col-md-4", "mb-4");
    productItem.innerHTML = `
      <div class="card text-dark h-100">
        <div class="image-container">
          <img src="${product.image}" class="card-img-top product-image" alt="${product.name}">
        </div>
        <div class="card-body">
          <h5 class="card-title">${product.name}</h5>
          <p class="card-text">$${product.price}</p>
          <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add to Cart</button>
        </div>
      </div>
    `;
    productList.appendChild(productItem);
  });

  const addToCartButtons = document.getElementsByClassName("add-to-cart");
  Array.from(addToCartButtons).forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  const clearCartButton = document.getElementById("clear-cart");
  clearCartButton.addEventListener("click", clearCart);
});

// Add to Cart function
function addToCart(event) {
  const productId = parseInt(event.target.getAttribute("data-id"));
  const selectedProduct = products.find((product) => product.id === productId);
  if (selectedProduct) {
    const existingCartItem = cartItems.find((item) => item.id === productId);
    if (existingCartItem) {
      existingCartItem.quantity += 1;
    } else {
      cartItems.push({ ...selectedProduct, quantity: 1 });
    }
    displayCartItems();
  }
}

// Display Cart Items
function displayCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  cartItemsContainer.innerHTML = "";

  let totalAmount = 0;

  cartItems.forEach((item) => {
    const cartItem = document.createElement("div");
    cartItem.classList.add("col-md-6", "mb-4");
    const itemTotal = item.price * item.quantity;
    totalAmount += itemTotal;

    cartItem.innerHTML = `
      <div class="card cart-item">
        <div class="row g-0">
          <div class="col-md-4 cart-img-container">
            <img src="${
              item.image
            }" class="card-img-top cart-item-image" alt="cart photo"${
      item.name
    }">
          </div>
          <div class="col-md-8">
            <div class="card-body">
             <div>
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">Quantity: ${item.quantity}</p>
              <p class="card-text">Price: $${item.price}</p>
              <p class="card-text">Total: $${itemTotal.toFixed(2)}</p>
              </div>

               <div>
                <i class="fas fa-trash delete-btn" data-id="${item.id}"></i>
             </div>
              
            </div>
          </div>
        </div>
      </div>
    `;

    cartItemsContainer.appendChild(cartItem);
  });

  const totalAmountElement = document.getElementById("total-amount");
  totalAmountElement.textContent = `$Total Price: ${totalAmount.toFixed(2)}`;

  const deleteButtons = document.getElementsByClassName("delete-btn");
  Array.from(deleteButtons).forEach((button) => {
    button.addEventListener("click", removeFromCart);
  });
}

// Remove from Cart
function removeFromCart(event) {
  const itemId = parseInt(event.target.getAttribute("data-id"));
  cartItems = cartItems.filter((item) => item.id !== itemId);
  displayCartItems();
}

// Clear Cart
function clearCart() {
  cartItems = [];
  displayCartItems();
}
