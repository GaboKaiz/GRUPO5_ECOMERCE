// Simulación de autenticación
const validUsername = "admin";
const validPassword = "12345";

// Cargar productos desde localStorage
let products = JSON.parse(localStorage.getItem("products")) || [];

// Renderizar productos agregados
function renderAddedProducts() {
  const addedProductsDiv = document.getElementById("added-products");
  addedProductsDiv.innerHTML = "";
  products.forEach((product) => {
    const productRow = `
            <tr class="border-b hover:bg-gray-50">
                <td class="p-3">
                    <img src="${product.image}" alt="${
      product.name
    }" class="w-12 h-12 object-contain">
                </td>
                <td class="p-3 text-gray-800">${product.name}</td>
                <td class="p-3 text-gray-600">${product.category}</td>
                <td class="p-3 text-gray-800">S/ ${product.price.toFixed(
                  2
                )}</td>
                <td class="p-3 text-gray-600 line-clamp-2">${
                  product.description
                }</td>
                <td class="p-3">
                    <button class="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700 transition-colors" onclick="deleteProduct(${
                      product.id
                    })">Eliminar</button>
                </td>
            </tr>
        `;
    addedProductsDiv.innerHTML += productRow;
  });
}

// Login
document.getElementById("login-btn").addEventListener("click", () => {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const errorMsg = document.getElementById("login-error");

  if (username === validUsername && password === validPassword) {
    document.getElementById("login-section").classList.add("hidden");
    document.getElementById("admin-section").classList.remove("hidden");
    document.getElementById("logout-btn").classList.remove("hidden");
    errorMsg.classList.add("hidden");
    renderAddedProducts();
  } else {
    errorMsg.classList.remove("hidden");
  }
});

// Cerrar sesión
document.getElementById("logout-btn").addEventListener("click", () => {
  document.getElementById("login-section").classList.remove("hidden");
  document.getElementById("admin-section").classList.add("hidden");
  document.getElementById("logout-btn").classList.add("hidden");
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});

// Cambiar entre subir archivo y URL
const imageMethodRadios = document.getElementsByName("image-method");
const imageFileSection = document.getElementById("image-file-section");
const imageUrlSection = document.getElementById("image-url-section");
const imagePreview = document.getElementById("image-preview");

imageMethodRadios.forEach((radio) => {
  radio.addEventListener("change", () => {
    if (radio.value === "file") {
      imageFileSection.classList.remove("hidden");
      imageUrlSection.classList.add("hidden");
      document.getElementById("product-image-url").value = "";
      imagePreview.classList.add("hidden");
    } else {
      imageFileSection.classList.add("hidden");
      imageUrlSection.classList.remove("hidden");
      document.getElementById("product-image-file").value = "";
      imagePreview.classList.add("hidden");
    }
  });
});

// Previsualizar imagen subida
document
  .getElementById("product-image-file")
  .addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        imagePreview.src = event.target.result;
        imagePreview.classList.remove("hidden");
      };
      reader.readAsDataURL(file);
    } else {
      imagePreview.classList.add("hidden");
    }
  });

// Previsualizar imagen desde URL
document.getElementById("product-image-url").addEventListener("input", (e) => {
  const url = e.target.value;
  if (url) {
    imagePreview.src = url;
    imagePreview.classList.remove("hidden");
  } else {
    imagePreview.classList.add("hidden");
  }
});

// Agregar producto
document.getElementById("add-product-btn").addEventListener("click", () => {
  const name = document.getElementById("product-name").value;
  const price = parseFloat(document.getElementById("product-price").value);
  const description = document.getElementById("product-description").value;
  const imageFile = document.getElementById("product-image-file").files[0];
  const imageUrl = document.getElementById("product-image-url").value;
  const category = document.getElementById("product-category").value;
  const imageMethod = document.querySelector(
    'input[name="image-method"]:checked'
  ).value;

  let image = "";

  if (imageMethod === "file" && imageFile) {
    const reader = new FileReader();
    reader.onload = (event) => {
      image = event.target.result;
      saveProduct(name, price, description, image, category);
    };
    reader.readAsDataURL(imageFile);
    return;
  } else if (imageMethod === "url" && imageUrl) {
    image = imageUrl;
  }

  if (name && price && description && image && category) {
    saveProduct(name, price, description, image, category);
  } else {
    alert("Por favor, completa todos los campos, incluyendo una imagen.");
  }
});

// Guardar producto
function saveProduct(name, price, description, image, category) {
  const newProduct = {
    id: products.length ? Math.max(...products.map((p) => p.id)) + 1 : 1,
    name,
    price,
    description,
    image,
    category,
  };
  products.push(newProduct);
  localStorage.setItem("products", JSON.stringify(products));
  renderAddedProducts();
  // Limpiar formulario
  document.getElementById("product-name").value = "";
  document.getElementById("product-price").value = "";
  document.getElementById("product-description").value = "";
  document.getElementById("product-image-file").value = "";
  document.getElementById("product-image-url").value = "";
  document.getElementById("product-category").value = "Electrónica";
  imagePreview.classList.add("hidden");
}

// Eliminar producto
function deleteProduct(productId) {
  products = products.filter((p) => p.id !== productId);
  localStorage.setItem("products", JSON.stringify(products));
  renderAddedProducts();
}

// Inicializar
renderAddedProducts();
