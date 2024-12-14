const products = [
    {
        "id": 1,
        "name": "Nasi Goreng",
        "description": "Nasi goreng yang lezat dengan bumbu spesial.",
        "image": "https://via.placeholder.com/150",
        "category": "Sup",
        "ingredients": [
            "2 piring nasi putih",
            "2 butir telur",
            "100 gram ayam, potong dadu",
            "2 sdm kecap manis",
            "1 sdt garam",
            "1 sdt merica",
            "2 siung bawang putih, cincang",
            "1 buah cabai merah, iris",
            "Minyak untuk menumis"
        ],
        "steps": [
            "Panaskan minyak dalam wajan, tumis bawang putih hingga harum.",
            "Masukkan ayam, masak hingga berubah warna.",
            "Tambahkan telur, aduk hingga telur matang.",
            "Masukkan nasi, kecap manis, garam, dan merica. Aduk rata.",
            "Tambahkan cabai merah, masak selama 2 menit.",
            "Sajikan nasi goreng hangat."
        ],
    },
    {
        "id": 2,
        "name": "Rendang Daging",
        "description": "Rendang daging sapi yang kaya rempah.",
        "category": "Sup",
        "image": "https://via.placeholder.com/150",
        "ingredients": [
            "1 kg daging sapi, potong dadu",
            "400 ml santan",
            "2 sdm minyak goreng",
            "1 sdt garam",
            "1 sdt gula merah",
            "Bumbu Halus:",
            "5 siung bawang merah",
            "3 siung bawang putih",
            "2 buah cabai merah",
            "1 cm jahe",
            "1 cm lengkuas",
            "1 batang serai, memarkan",
            "Daun jeruk secukupnya"
        ],
        "steps": [
            "Haluskan semua bumbu halus.",
            "Panaskan minyak, tumis bumbu halus hingga harum.",
            "Masukkan daging sapi, aduk hingga daging berubah warna.",
            "Tambahkan santan, garam, dan gula merah. Masak dengan api kecil hingga daging empuk.",
            "Tambahkan daun jeruk dan serai, masak hingga kuah mengental.",
            "Sajikan rendang daging dengan nasi putih."
        ]
    },
    {
        "id": 3,
        "name": "Pasta Carbonara",
        "description": "Pasta carbonara yang creamy dan lezat.",
        "image": "https://via.placeholder.com/150",
        "category": "Sup",
        "ingredients": [
            "200 gram pasta spaghetti",
            "100 gram daging bacon, potong dadu",
            "2 butir telur",
            "50 gram keju parmesan, parut",
            "2 siung bawang putih, cincang halus",
            "1 sdt garam",
            "1/2 sdt merica",
            "Peterseli cincang untuk hiasan"
        ],
        "steps": [
            "Rebus pasta spaghetti dalam air mendidih yang sudah diberi garam hingga al dente. Tiriskan.",
            "Dalam wajan, masak bacon hingga crispy. Tambahkan bawang putih dan tumis hingga harum.",
            "Dalam mangkuk terpisah, kocok telur dan campurkan dengan keju parmesan, garam, dan merica.",
            "Masukkan pasta yang sudah direbus ke dalam wajan dengan bacon, aduk rata.",
            "Angkat wajan dari api, lalu tuangkan campuran telur ke dalam pasta. Aduk cepat hingga saus mengental.",
            "Sajikan pasta carbonara dengan taburan peterseli dan keju parmesan tambahan."
        ]
    },
    {
    "id": 4,
    "name": "Sate Ayam",
    "description": "Sate ayam yang lezat dengan bumbu kacang.",
    "image": "https://via.placeholder.com/150",
    "category": "Makanan Utama",
    "ingredients": [
        "500 gram daging ayam, potong dadu",
        "10 tusuk sate",
        "2 sdm minyak goreng",
        "1 sdt garam",
        "1 sdt merica",
        "1 sdm kecap manis",
        "Bumbu Kacang:",
        "100 gram kacang tanah, goreng",
        "2 siung bawang putih",
        "2 buah cabai merah",
        "1 sdm gula merah",
        "1 sdm air asam jawa",
        "Garam secukupnya"
    ],
    "steps": [
        "Campurkan daging ayam dengan garam, merica, dan kecap manis. Diamkan selama 30 menit.",
        "Tusuk daging ayam ke tusuk sate.",
        "Panaskan minyak dalam wajan, lalu panggang sate di atas api sedang hingga matang dan kecokelatan.",
        "Untuk membuat bumbu kacang, haluskan kacang tanah, bawang putih, cabai merah, gula merah, dan air asam jawa.",
        "Tambahkan garam secukupnya dan aduk hingga rata.",
        "Sajikan sate ayam dengan bumbu kacang di atasnya."
    ]
}
];

const productList = document.getElementById('product-list');
const favorites = new Set(); // Set untuk menyimpan ID resep favorit

products.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    productDiv.innerHTML = `
    <img src="${product.image}" alt="${product.name}">
    <h2>${product.name}</h2>
    <p>${product.description}</p>
    <button class="favorite-btn" data-id="${product.id}">
        <i class="fas fa-heart" style="color: ${favorites.has(product.id) ? 'red' : 'gray'};"></i> Favorit
    </button>
`;
    
    productDiv.querySelector('.favorite-btn').addEventListener('click', (event) => {
        event.stopPropagation(); // Mencegah event bubbling
        toggleFavorite(product.id);
        event.target.querySelector('i').style.color = favorites.has(product.id) ? 'red' : 'gray';
    });

    productList.appendChild(productDiv);
});

function toggleFavorite(productId) {
    if (favorites.has(productId)) {
        favorites.delete(productId);
    } else {
        favorites.add(productId);
    }
}

function showRecipeDetails(product) {
    const modalContent = document.getElementById('modalContent');
    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <h3>Bahan-bahan:</h3>
        <ul>
            ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
        </ul>
        <h3>Langkah-langkah:</h3>
        <ol>
            ${product.steps.map(step => `<li>${step}</li>`).join('')}
        </ol>
    `;
    document.getElementById('recipeModal').style.display = 'block';
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('recipeModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});
const categories = ["Sarapan", "Makanan Utama", "Sup", "dessert", "tradisional", "camilan"];

categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.className = 'category';
    categoryDiv.innerHTML = `<h2>${category.charAt(0).toUpperCase() + category.slice(1)}</h2>`;

    categoryDiv.addEventListener('click', () => {
        filterRecipesByCategory(category);
    });
    
    const recipesInCategory = products.filter(product => product.category === category);
    
    recipesInCategory.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.className = 'product';
        productDiv.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
        `;
        
        productDiv.addEventListener('click', () => {
            showRecipeDetails(product);
        });

        categoryDiv.appendChild(productDiv);
    });

    document.getElementById('recipesGrid').appendChild(categoryDiv);
});
