// Product Data
var products = {
    cars: [
        { name: "Tesla Model S", image: "https://via.placeholder.com/200", desc: "Electric car" },
        { name: "Ford Mustang", image: "https://via.placeholder.com/200", desc: "Muscle car" },
        { name: "BMW X5", image: "https://via.placeholder.com/200", desc: "Luxury SUV" },
        { name: "Toyota Corolla", image: "https://via.placeholder.com/200", desc: "Reliable sedan" },
    ],
    bikes: [
        { name: "Yamaha YZF", image: "https://via.placeholder.com/200", desc: "Sport bike" },
        { name: "Harley Davidson", image: "https://via.placeholder.com/200", desc: "Cruiser bike" },
        { name: "Kawasaki Ninja", image: "https://via.placeholder.com/200", desc: "Racing bike" },
        { name: "Royal Enfield", image: "https://via.placeholder.com/200", desc: "Classic bike" },
    ],
    cameras: [
        { name: "Canon EOS R5", image: "https://via.placeholder.com/200", desc: "Mirrorless camera" },
        { name: "Nikon Z6", image: "https://via.placeholder.com/200", desc: "DSLR camera" },
        { name: "Sony Alpha", image: "https://via.placeholder.com/200", desc: "Compact camera" },
        { name: "Fujifilm X-T4", image: "https://via.placeholder.com/200", desc: "Hybrid camera" },
    ],
    toys: [
        { name: "LEGO Set", image: "https://via.placeholder.com/200", desc: "Creative toy" },
        { name: "Barbie Doll", image: "https://via.placeholder.com/200", desc: "Kids toy" },
        { name: "Hot Wheels", image: "https://via.placeholder.com/200", desc: "Racing toy" },
        { name: "Action Figure", image: "https://via.placeholder.com/200", desc: "Superhero toy" },
    ],
};

// Display products
function displayProducts(filter) {
    var productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; // Clear existing products

    var allProducts = filter === "all" ? 
        [].concat(products.cars, products.bikes, products.cameras, products.toys) 
        : products[filter];

    allProducts.forEach(function (product) {
        var card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="card-image" data-name="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
        `;
        productContainer.appendChild(card);
    });
}

// Handle Image Upload
var selectedCardName = null;
document.body.addEventListener("click", function (event) {
    if (event.target.classList.contains("card-image")) {
        selectedCardName = event.target.dataset.name;
        document.getElementById("image-upload-modal").classList.remove("hidden");
    }
});

document.getElementById("upload-btn").addEventListener("click", function () {
    var fileInput = document.getElementById("image-input");
    if (fileInput.files.length > 0 && selectedCardName) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var imageSrc = e.target.result;
            var allProducts = [].concat(
                products.cars,
                products.bikes,
                products.cameras,
                products.toys
            );
            var product = allProducts.find((p) => p.name === selectedCardName);
            if (product) product.image = imageSrc;
            displayProducts(document.getElementById("filter").value);
            document.getElementById("image-upload-modal").classList.add("hidden");
        };
        reader.readAsDataURL(fileInput.files[0]);
    }
});

document.getElementById("close-btn").addEventListener("click", function () {
    document.getElementById("image-upload-modal").classList.add("hidden");
});

// Initialize
displayProducts("all");
document.getElementById("filter").addEventListener("change", function () {
    displayProducts(this.value);
});
