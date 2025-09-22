const products = [
    { name: "Harmonica", desc: "A chromatic harmonica in the key of C.", price: "$19.99", img: "https://via.placeholder.com/150" },
    { name: "Stickers", desc: "Some stickers of assorted sizes", price: "$24.99", img: "https://via.placeholder.com/150" },
    { name: "Videogame", desc: "New videogame for the Xbox 360", price: "$39.99", img: "https://via.placeholder.com/150" },
    { name: "Clothes", desc: "Some clothes in assorted colors", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "title", desc: "placeholder desc", price: "$14.99", img: "https://via.placeholder.com/150" },
];

let cartCount = 0;
const cartItems = [];

document.getElementById("header").innerHTML = `
  <div class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <a href="/" class="block"><img src="Images/Amazon-Logo.png" class="h-12" /></a>
    <input type="text" placeholder="Search..." class="w-1/2 p-2 rounded text-black" />
    <div class="flex items-center space-x-2">
  <img src="Images/cart.png" class="h-6" />
  <button id="cart-button" class="hover:underline">Cart (<span id="cart-count">0</span>)</button>
    </div>

`;

document.getElementById("footer").innerHTML = `
  <div class="bg-gray-800 text-white p-4 text-center">
    &copy; 2025 Amazon Mockup
  </div>
`;

function getCartTotal() {
    return cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return (total + price) * 1.05;
    }, 0);
}


document.getElementById("cart-button").addEventListener("click", () => {
    const main = document.getElementById("main");
    main.innerHTML = `
    <section class="p-6">
      <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
      <ul id="cart-list" class="space-y-4"></ul>
      ${cartItems.length > 0 ? `
        <p>sales tax 5%</p>
        <p class="mt-4 text-lg font-semibold" > Estimated Total: $${ getCartTotal().toFixed(2) }</p>
        <button id="buy" class="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-300">Proceed to purchase</button>
        ` : ''}
      <button id="back-button" class="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Back to Products</button>
    </section>
  `;

    const list = document.getElementById("cart-list");
    if (cartItems.length === 0) {
        list.innerHTML = `<li class="text-gray-500">Your cart is empty.</li>`;
    } else {
        cartItems.forEach(item => {
            const li = document.createElement("li");
            li.className = "bg-white p-4 rounded shadow";
            li.textContent = `${item.name} - ${item.price}`;
            list.appendChild(li);
        });
        
    }

    document.getElementById("back-button").addEventListener("click", renderProducts);
});

function renderProducts() {
    const main = document.getElementById("main");
    main.innerHTML = `
    <section class="bg-yellow-300 p-8 text-center">
      <h1 class="text-4xl font-bold mb-2">Welcome to Amazon</h1>
      <p class="text-lg">Shop deals and explore categories.</p>
    </section>
    <section id="product-holder" class="p-6 flex flex-wrap gap-6 justify-center"></section>
  `;

    const grid = document.getElementById("product-holder");
    products.forEach(product => {
        const card = document.createElement("div");
        card.className = "bg-white p-4 rounded shadow hover:shadow-lg transition w-64";

        card.innerHTML = `
      <img src="${product.img}" alt="${product.name}" class="mb-2" />
      <h2 class="text-lg font-semibold">${product.name}</h2>
      <p class="text-sm text-gray-700 mb-1">${product.desc}</p>
      <p class="text-sm text-gray-600">${product.price}</p>
      <button class="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Add to Cart</button>
    `;

        card.querySelector("button").addEventListener("click", () => {
            cartCount++;
            document.getElementById("cart-count").textContent = cartCount;
            cartItems.push(product);
            alert("Your item has been added to the cart");
        });

        grid.appendChild(card);
    });
}

renderProducts();
