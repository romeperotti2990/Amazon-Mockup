// Header
document.getElementById("header").innerHTML = `
  <div class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <div class="text-2xl font-bold">Amazon</div>
    <input type="text" placeholder="Search..." class="w-1/2 p-2 rounded text-black" />
    <div class="space-x-4">
      <button class="hover:underline">Sign In</button>
      <button class="hover:underline">Cart (<span id="cart-count">0</span>)</button>
    </div>
  </div>
`;

// Hero + Product Grid
document.getElementById("main").innerHTML = `
  <section class="bg-yellow-300 p-8 text-center">
    <h1 class="text-4xl font-bold mb-2">Welcome to Amazon</h1>
    <p class="text-lg">Shop deals and explore categories.</p>
  </section>
  <section id="product-grid" class="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"></section>
`;

const products = [
    { name: "Product A", price: "$19.99", img: "https://via.placeholder.com/150" },
    { name: "Product B", price: "$24.99", img: "https://via.placeholder.com/150" },
    { name: "Product C", price: "$39.99", img: "https://via.placeholder.com/150" },
];

let cartCount = 0;
const grid = document.getElementById("product-grid");

products.forEach(product => {
    const card = document.createElement("div");
    card.className = "bg-white p-4 rounded shadow hover:shadow-lg transition";

    card.innerHTML = `
    <img src="${product.img}" alt="${product.name}" class="mb-2" />
    <h2 class="text-lg font-semibold">${product.name}</h2>
    <p class="text-sm text-gray-600">${product.price}</p>
    <button class="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Add to Cart</button>
  `;

    card.querySelector("button").addEventListener("click", () => {
        cartCount++;
        document.getElementById("cart-count").textContent = cartCount;
    });

    grid.appendChild(card);
});

// Footer
document.getElementById("footer").innerHTML = `
  <div class="bg-gray-800 text-white p-4 text-center">
    &copy; 2025 Amazon Mockup
  </div>
`;
