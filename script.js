const products = [
    { name: "Harmonica", desc: "A chromatic harmonica in the key of C.", price: "$19.99", img: "Images/Harmonica.jpg" },
    { name: "Stickers", desc: "Assorted stickers for decoration.", price: "$4.99", img: "Images/Stickers.jpg" },
    { name: "Videogame", desc: "New videogame for the Xbox 360.", price: "$39.99", img: "https://via.placeholder.com/150" },
    { name: "T-Shirt", desc: "Comfortable cotton t-shirt.", price: "$14.99", img: "https://via.placeholder.com/150" },
    { name: "Bluetooth Speaker", desc: "Portable wireless speaker.", price: "$29.99", img: "https://via.placeholder.com/150" },
    { name: "Water Bottle", desc: "Reusable stainless steel bottle.", price: "$12.99", img: "https://via.placeholder.com/150" },
    { name: "Notebook", desc: "Lined notebook for notes.", price: "$7.99", img: "https://via.placeholder.com/150" },
    { name: "Headphones", desc: "Over-ear noise cancelling headphones.", price: "$59.99", img: "https://via.placeholder.com/150" },
    { name: "Coffee Mug", desc: "Ceramic mug for hot drinks.", price: "$9.99", img: "https://via.placeholder.com/150" },
    { name: "Desk Lamp", desc: "LED lamp for your desk.", price: "$24.99", img: "https://via.placeholder.com/150" },
    { name: "Backpack", desc: "Durable backpack for travel.", price: "$34.99", img: "https://via.placeholder.com/150" },
    { name: "Socks", desc: "Pack of 5 pairs of socks.", price: "$11.99", img: "https://via.placeholder.com/150" },
    { name: "Phone Charger", desc: "Fast charging USB-C cable.", price: "$8.99", img: "https://via.placeholder.com/150" },
    { name: "Pen Set", desc: "Set of 10 gel pens.", price: "$6.99", img: "https://via.placeholder.com/150" },
    { name: "Umbrella", desc: "Compact travel umbrella.", price: "$13.99", img: "https://via.placeholder.com/150" },
];

let cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

document.getElementById("header").innerHTML = `
  <div class="bg-gray-800 text-white p-4 flex justify-between items-center">
    <img src="Images/Amazon-Logo.png" id="logo" class="h-12 hover:cursor-pointer" />
    <input type="text" placeholder="Search..." class="w-1/2 p-2 rounded text-black" />
    <div class="flex items-center space-x-2">
      <img src="Images/cart.png" class="h-6" />
      <button id="cart-button" class="hover:underline">Cart (<span id="cart-count">${cartCount}</span>)</button>
    </div>
  </div>
`;

document.getElementById("footer").innerHTML = `
  <div class="bg-gray-800 text-white p-4 text-center">
    &copy; 2025 Amazon Mockup
  </div>
`;

document.getElementById("logo").addEventListener("click", renderProducts);
document.getElementById("cart-button").addEventListener("click", renderCart);

function getCartTotal() {
    const subtotal = cartItems.reduce((total, item) => {
        const price = parseFloat(item.price.replace("$", ""));
        return total + price * item.quantity;
    }, 0);
    return subtotal * 1.05;
}

function updateCartState() {
    document.getElementById("cart-count").textContent = cartCount;
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    localStorage.setItem("cartCount", cartCount.toString());
    renderCart();
}

function renderCart() {
    const main = document.getElementById("main");
    main.innerHTML = `
    <section class="p-6">
      <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
      <ul id="cart-list" class="space-y-4"></ul>
      ${cartItems.length > 0 ? `
        <p class="text-xs">*Sales tax 5%</p>
        <p class="mt-4 text-lg font-semibold">Estimated Total: $${getCartTotal().toFixed(2)}</p>
        <button id="buy" class="mt-6 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-300">Proceed to purchase</button>
      ` : ''}
      <button id="back-button" class="mt-6 bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-700">Back to Products</button>
    </section>
  `;

    const list = document.getElementById("cart-list");
    if (cartItems.length === 0) {
        list.innerHTML = `<li class="text-gray-500">Your cart is empty.</li>`;
    } else {
        cartItems.forEach((item, index) => {
            const li = document.createElement("li");
            li.className = "bg-white p-4 rounded shadow flex justify-between items-center";

            li.innerHTML = `
        <div class="flex flex-col">
          <span class="font-semibold">${item.name}</span>
          <span>${item.price}</span>
        </div>
        <div class="flex items-center space-x-2">
          <button class="bg-gray-300 px-2 py-1 rounded" data-action="decrease">-</button>
          <input
            type="text"
            value="${item.quantity}"
            class="w-12 text-center border rounded focus:outline-none"
            style="appearance: textfield; -moz-appearance: textfield; -webkit-appearance: none;"
          />
          <button class="bg-gray-300 px-2 py-1 rounded" data-action="increase">+</button>
          <button class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600" data-action="remove">Remove</button>
        </div>
      `;

            li.querySelector('[data-action="increase"]').addEventListener("click", () => {
                item.quantity++;
                cartCount++;
                updateCartState();
            });

            li.querySelector('[data-action="decrease"]').addEventListener("click", () => {
                if (item.quantity > 1) {
                    item.quantity--;
                    cartCount--;
                } else {
                    cartCount -= item.quantity;
                    cartItems.splice(index, 1);
                }
                updateCartState();
            });

            li.querySelector('[data-action="remove"]').addEventListener("click", () => {
                cartCount -= item.quantity;
                cartItems.splice(index, 1);
                updateCartState();
            });

            li.querySelector('input').addEventListener("change", (e) => {
                let newQty = parseInt(e.target.value);
                if (isNaN(newQty) || newQty < 1) {
                    cartCount -= item.quantity;
                    cartItems.splice(index, 1);
                } else {
                    cartCount += newQty - item.quantity;
                    item.quantity = newQty;
                }
                updateCartState();
            });

            list.appendChild(li);
        });
    }

    document.getElementById("back-button").addEventListener("click", renderProducts);
    document.getElementById("buy")?.addEventListener("click", () => {
        alert("why are you trying to buy things on a fake website?");
    });
}

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
        card.className = "bg-white p-4 rounded shadow hover:shadow-lg transition w-64 flex flex-col items-center text-center";

        card.innerHTML = `
        <img src="${product.img}" alt="${product.name}" class="w-32 h-32 object-cover mb-2 rounded" />
        <h2 class="text-lg font-semibold">${product.name}</h2>
        <p class="text-sm text-gray-700 mb-1">${product.desc}</p>
        <p class="text-sm text-gray-600">${product.price}</p>
        <button class="mt-2 bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">Add to Cart</button>
    `;

        card.querySelector("button").addEventListener("click", () => {
            const existing = cartItems.find(i => i.name === product.name);
            if (existing) {
                existing.quantity++;
            } else {
                cartItems.push({ ...product, quantity: 1 });
            }
            cartCount++;
            document.getElementById("cart-count").textContent = cartCount;
            localStorage.setItem("cartItems", JSON.stringify(cartItems));
            localStorage.setItem("cartCount", cartCount.toString());
            alert("Your item has been added to the cart");
        });

        grid.appendChild(card);
    });
}

renderProducts();
