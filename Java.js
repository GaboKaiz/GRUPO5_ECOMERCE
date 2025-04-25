let products = JSON.parse(localStorage.getItem("products")) || [
  {
    id: 1,
    name: "Auriculares Bluetooth",
    price: 113.96,
    image: "https://via.placeholder.com/150",
    description: "Auriculares inalámbricos con gran calidad de sonido.",
    category: "Electrónica",
  },
  {
    id: 2,
    name: "Smartphone 5G",
    price: 1899.96,
    image: "https://via.placeholder.com/150",
    description: "Teléfono de última generación con conectividad 5G.",
    category: "Teléfonos",
  },
  {
    id: 3,
    name: "Laptop Ultraligera",
    price: 3799.96,
    image: "https://via.placeholder.com/150",
    description: "Laptop potente y ligera para trabajo y entretenimiento.",
    category: "Computadoras",
  },
  {
    id: 4,
    name: "Cámara Digital",
    price: 759.96,
    image: "https://via.placeholder.com/150",
    description: "Cámara compacta con alta resolución.",
    category: "Fotografía",
  },
];
let cart = [];

function renderProducts(searchTerm = "") {
  const productsDiv = document.getElementById("products");
  const noResultsDiv = document.getElementById("no-results");
  productsDiv.innerHTML = "";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filteredProducts.length === 0) {
    noResultsDiv.classList.remove("hidden");
  } else {
    noResultsDiv.classList.add("hidden");
    filteredProducts.forEach((product) => {
      const productCard = `
                        <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                            <img src="${product.image}" alt="${
        product.name
      }" class="w-full h-64 object-contain mb-4">
                            <h3 class="text-lg font-semibold text-gray-800 line-clamp-2">${
                              product.name
                            }</h3>
                            <p class="text-sm text-gray-500">${
                              product.category
                            }</p>
                            <p class="text-sm text-gray-600 line-clamp-3">${
                              product.description
                            }</p>
                            <p class="text-xl font-bold text-gray-900 mt-2">S/ ${product.price.toFixed(
                              2
                            )}</p>
                            <button class="w-full bg-[#F08804] text-white py-2 mt-3 rounded-md hover:bg-orange-600 transition-colors" onclick="addToCart(${
                              product.id
                            })">Añadir al Carrito</button>
                        </div>
                    `;
      productsDiv.innerHTML += productCard;
    });
  }
}

function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function updateCart() {
  const cartItemsDiv = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  cartItemsDiv.innerHTML = "";
  let total = 0;
  let count = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    count += item.quantity;
    const cartItem = `
                    <div class="flex justify-between items-center border-b py-3 text-sm">
                        <div class="flex-1 pr-2">
                            <p class="font-semibold text-gray-800 line-clamp-1">${
                              item.name
                            }</p>
                            <p class="text-gray-600">S/ ${item.price.toFixed(
                              2
                            )} x ${item.quantity}</p>
                        </div>
                        <button class="text-red-600 hover:text-red-800 font-semibold" onclick="removeFromCart(${
                          item.id
                        })">Eliminar</button>
                    </div>
                `;
    cartItemsDiv.innerHTML += cartItem;
  });

  cartCount.textContent = count;
  cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function toggleCart() {
  const cartDiv = document.getElementById("cart");
  cartDiv.classList.toggle("translate-x-full");
  cartDiv.classList.toggle("cart-open");
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (cart.length === 0) {
    alert("El carrito está vacío.");
    return;
  }
  document.getElementById("payment-message").classList.remove("hidden");
  document.getElementById("payment-message").classList.add("fade-in");
  cart = [];
  updateCart();
  toggleCart();
});

function closePaymentMessage() {
  document.getElementById("payment-message").classList.add("hidden");
}

// Evento de búsqueda
document.getElementById("search-input").addEventListener("input", (e) => {
  const searchTerm = e.target.value;
  renderProducts(searchTerm);
});

// Inicializar
renderProducts();
