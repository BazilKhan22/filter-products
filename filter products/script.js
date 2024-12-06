// Product Data
var products = {
    cars: [
        { name: "Tesla Model S", image: "https://www.motortrend.com/uploads/sites/5/2019/04/2019-Tesla-Model-S-range-road-trip-rear-side-view.jpg?w=768&width=768&q=75&format=webp", desc: "Electric car" },
        { name: "Ford Mustang", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdCC53Cl5DfN6FA7BNL0Mb3rJQ9YbuwOxaVg&s", desc: "Muscle car" },
        { name: "BMW X5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrUwVQXrEcrKFVYgzMdQrVsEWM4E96YKYacQ&s", desc: "Luxury SUV" },
        { name: "Toyota Corolla", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOUH8RmuH-PHa6X4CINW3Lbi9C1N32XnYRTA&s", desc: "Reliable sedan" },
    ],
    bikes: [
        { name: "Yamaha YZF", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHb1q44uz5o885HhVVYFuAGwDV_ItOt4vZEw&s", desc: "Sport bike" },
        { name: "Harley Davidson", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQDb4JHn4kccF1HkST1A2nWEL1mWvmZLOA-2A&s", desc: "Cruiser bike" },
        { name: "Kawasaki Ninja", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStLD8RuTmZhQB8BpL9QU5kjq2v29Dwshh9_A&s", desc: "Racing bike" },
        { name: "Royal Enfield", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTpE54h8BWV1o43kBILbexd5Ceu2RUA9PkuA&s", desc: "Classic bike" },
    ],
    cameras: [
        { name: "Canon EOS R5", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjWgSb9XGjc26iL4uKb-dEIJxuXgNBTVqlqw&s", desc: "Mirrorless camera" },
        { name: "Nikon Z6", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT8e-z0hdo1pMEIru18B_3T3sKdHm-yNCdAcw&s", desc: "DSLR camera" },
        { name: "Sony Alpha", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEuJZKnYGvDSlgegl1001XQPJmw69ZH9qCnA&s", desc: "Compact camera" },
        { name: "Fujifilm X-T4", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDGTHPWYnd05YeDH6lzj2f6DoDDIJr_nVSuw&s", desc: "Hybrid camera" },
    ],
    toys: [
        { name: "LEGO Set", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzmC82-6FmLXNo_c5p7lYF8SkwMuiWLNgSnA&s", desc: "Creative toy" },
        { name: "Barbie Doll", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQf0jZ9ZhM_lVUxccuv9n1X5HXPUG30bEjA6g&s", desc: "Kids toy" },
        { name: "Hot Wheels", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTAMXI2bknwb5gQKcRBEL8e-T8BbwugEwOD5g&s", desc: "Racing toy" },
        { name: "Action Figure", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLh7xe6Voi3ArX-UJIi3QWXMEbIIjdrTiUKQ&s", desc: "Superhero toy" },
    ],
};


function displayProducts(filter) {
    var productContainer = document.getElementById("product-container");
    productContainer.innerHTML = ""; 

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
