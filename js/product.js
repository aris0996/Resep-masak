// Inisialisasi variabel global
const favorites = new Set();
let activeFilters = new Set();
const filterToggle = document.querySelector('.filter-toggle');
const filtersDropdown = document.querySelector('.filters');
const activeFiltersContainer = document.querySelector('.active-filters');
const productList = document.getElementById('product-list');
const searchInput = document.getElementById('searchInput');

// Data products
const products = [
    {
        "id": 1,
        "name": "Nasi Goreng Spesial",
        "description": "Nasi goreng yang lezat dengan bumbu spesial.",
        "image": "https://manualdecocina.com/wp-content/uploads/2024/04/Nasi-Goreng-receta.jpg",
        "category": "Makanan Utama",
        "difficulty": "easy",
        "time": "quick",
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
        "category": "Makanan Utama",
        "difficulty": "hard",
        "time": "slow",
        "image": "https://www.astronauts.id/blog/wp-content/uploads/2023/03/Resep-Rendang-Daging-Sapi-Untuk-Lebaran-Gurih-dan-Nikmat-1200x675.jpg",
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
        "name": "Soto Ayam",
        "description": "Soto ayam kuning dengan kuah gurih.",
        "image": "https://cdn.yummy.co.id/content-images/images/20230916/fe74073f014c83d8dbaa93cb7e94270f.jpg?x-oss-process=image/format,webp",
        "category": "Sup",
        "difficulty": "medium",
        "time": "medium",
        "ingredients": [
            "500g ayam",
            "2L air",
            "3 lembar daun salam",
            "2 batang serai",
            "Bumbu halus",
            "Tauge",
            "Bihun",
            "Daun bawang"
        ],
        "steps": [
            "Rebus ayam dengan bumbu",
            "Sajikan dengan pelengkap"
        ]
    },
    {
        "id": 4,
        "name": "Pisang Goreng",
        "description": "Pisang goreng crispy",
        "image": "https://awsimages.detik.net.id/community/media/visual/2023/10/24/resep-pisang-goreng-pandan_43.jpeg?w=600&q=90",
        "category": "Camilan",
        "difficulty": "easy",
        "time": "quick",
        "ingredients": [
            "6 buah pisang",
            "Tepung terigu",
            "Gula",
            "Garam"
        ],
        "steps": [
            "Buat adonan tepung",
            "Goreng pisang"
        ]
    },
    {
        "id": 5,
        "name": "Es Cendol",
        "description": "Es cendol segar",
        "image": "https://www.unileverfoodsolutions.co.id/dam/global-ufs/mcos/SEA/calcmenu/recipes/ID-recipes/Cendol-Bango/Cendol%20Bango%20copy.jpg",
        "category": "Minuman",
        "difficulty": "easy",
        "time": "quick",
        "ingredients": [
            "Cendol",
            "Santan",
            "Gula merah",
            "Es batu"
        ],
        "steps": [
            "Siapkan cendol",
            "Tambahkan santan dan gula merah"
        ]
    },
    {
        "id": 6,
        "name": "Nasi Uduk",
        "description": "Nasi yang dimasak dengan santan dan rempah-rempah.",
        "image": "https://cdn1-production-images-kly.akamaized.net/bdMMdUeRIi2EGRbRMlFvpgjreVk=/1x60:700x454/800x450/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/3264167/original/045475800_1602402228-1212646998.jpg",
        "category": "Makanan Utama",
        "difficulty": "easy",
        "time": "medium",
        "ingredients": [
            "500g beras",
            "400ml santan",
            "2 lembar daun salam",
            "2 lembar daun pandan",
            "2 batang serai",
            "1 sdt garam",
            "Pelengkap: bawang goreng, timun, telur dadar"
        ],
        "steps": [
            "Cuci beras hingga bersih",
            "Masak beras dengan santan dan bumbu",
            "Kukus hingga matang",
            "Sajikan dengan pelengkap"
        ]
    },
    {
        "id": 7,
        "name": "Sate Lilit",
        "description": "Sate khas Bali dengan daging ikan yang dibumbui.",
        "image": "https://awsimages.detik.net.id/community/media/visual/2020/09/17/sate-lilit-ayam-khas-bali-1.jpeg?w=600&q=90",
        "category": "Makanan Utama",
        "difficulty": "medium",
        "time": "medium",
        "ingredients": [
            "500g ikan tuna giling",
            "200ml santan kental",
            "Bumbu halus:",
            "6 siung bawang merah",
            "4 siung bawang putih",
            "3 cabai merah",
            "2 cm kunyit",
            "2 cm lengkuas",
            "Batang serai untuk tusuk sate"
        ],
        "steps": [
            "Haluskan bumbu",
            "Campur ikan dengan bumbu dan santan",
            "Lilitan pada batang serai",
            "Bakar hingga matang"
        ]
    },
    {
        "id": 8,
        "name": "Sambal Matah",
        "description": "Sambal khas Bali yang segar dan pedas.",
        "image": "https://i.ytimg.com/vi/yebn1iPHxWE/maxresdefault.jpg",
        "category": "Pendamping",
        "difficulty": "easy",
        "time": "quick",
        "ingredients": [
            "10 siung bawang merah",
            "5 cabai rawit",
            "3 batang serai",
            "5 lembar daun jeruk",
            "1 buah jeruk limau",
            "Minyak panas",
            "Garam dan terasi"
        ],
        "steps": [
            "Iris semua bahan",
            "Campur dengan garam dan terasi",
            "Siram dengan minyak panas",
            "Peras jeruk limau"
        ]
    },
    {
        "id": 9,
        "name": "Sayur Asem",
        "description": "Sayur berkuah asam segar dengan berbagai sayuran.",
        "image": "https://i.ytimg.com/vi/aogYXqKPSAM/maxresdefault.jpg",
        "category": "Sup",
        "difficulty": "easy",
        "time": "medium",
        "ingredients": [
            "Kacang panjang",
            "Labu siam",
            "Jagung manis",
            "Melinjo",
            "Asam jawa",
            "Daun melinjo",
            "Bumbu halus",
            "Garam dan gula"
        ],
        "steps": [
            "Didihkan air",
            "Masukkan bumbu halus",
            "Masukkan sayuran sesuai tingkat kematangan",
            "Tambahkan asam jawa"
        ]
    },
    {
        "id": 10,
        "name": "Klepon",
        "description": "Kue tradisional berbahan dasar tepung ketan dengan isi gula merah.",
        "image": "https://cdn0-production-images-kly.akamaized.net/4dOsAjpaOZumjoxquorYgM1AlWc=/1200x675/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3265521/original/082336300_1602549870-istock-1145447456-copy_ratio-16x9.jpg",
        "category": "Camilan",
        "difficulty": "medium",
        "time": "medium",
        "ingredients": [
            "250g tepung ketan",
            "100ml air daun pandan",
            "Gula merah",
            "Kelapa parut",
            "Garam",
            "Air hangat"
        ],
        "steps": [
            "Uleni tepung dengan air pandan",
            "Isi dengan gula merah",
            "Rebus dalam air mendidih",
            "Gulingkan di kelapa parut"
        ]
    },
    {
        "id": 11,
        "name": "Sop Buntut",
        "description": "Sup buntut sapi dengan kuah bening dan sayuran.",
        "image": "https://asset.kompas.com/crops/-ST2RqjESmF-NIsp703_Ji7wvf4=/139x96:939x629/1200x800/data/photo/2022/09/27/63329597320d8.jpg",
        "category": "Sup",
        "difficulty": "hard",
        "time": "slow",
        "ingredients": [
            "1kg buntut sapi",
            "Wortel",
            "Kentang",
            "Daun bawang",
            "Seledri",
            "Bumbu sup",
            "Bawang goreng"
        ],
        "steps": [
            "Rebus buntut hingga empuk",
            "Tumis bumbu",
            "Masukkan sayuran",
            "Sajikan dengan bawang goreng"
        ]
    },
    {
        "id": 12,
        "name": "Es Doger",
        "description": "Minuman segar dengan campuran kelapa muda dan tape.",
        "image": "https://o-cdn-cas.oramiland.com/parenting/images/unnamed_SEfmBOv.width-800.format-webp.webp",
        "category": "Minuman",
        "difficulty": "medium",
        "time": "medium",
        "ingredients": [
            "Kelapa muda",
            "Tape singkong",
            "Susu kental manis",
            "Sirup merah",
            "Es serut",
            "Alpukat"
        ],
        "steps": [
            "Serut es",
            "Susun bahan-bahan",
            "Tambahkan susu dan sirup",
            "Aduk rata"
        ]
    },
    {
        "id": 13,
        "name": "Martabak Telur",
        "description": "Martabak gurih dengan isian telur, daging cincang dan sayuran.",
        "image": "https://asset-2.tstatic.net/tribunnews/foto/bank/images/martabak-telur-kulit-lumpia-yang-mudah-dibuat-di-rumah.jpg",
        "category": "Camilan",
        "difficulty": "medium",
        "time": "medium",
        "ingredients": [
            "Kulit lumpia",
            "Telur",
            "Daging sapi cincang",
            "Daun bawang",
            "Bawang merah",
            "Bawang putih",
            "Merica",
            "Garam",
            "Minyak goreng"
        ],
        "steps": [
            "Tumis bumbu hingga harum",
            "Masak daging cincang hingga matang",
            "Campurkan dengan telur dan daun bawang",
            "Isi kulit lumpia dengan adonan",
            "Lipat rapi dan goreng hingga kecoklatan",
            "Sajikan dengan saus dan cabe rawit"
        ]
    }
];

// Fungsi untuk menangani filter
function handleFilters() {
    // Toggle dropdown
    filterToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        filtersDropdown.classList.toggle('show');
        filterToggle.classList.toggle('active');
    });

    // Tutup dropdown saat klik di luar
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.filter-container')) {
            filtersDropdown?.classList.remove('show');
            filterToggle?.classList.remove('active');
        }
    });

    // Event listener untuk tombol filter
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const filterType = btn.dataset.filter;
            toggleFilter(filterType, btn);
        });
    });
}

// Fungsi untuk toggle filter
function toggleFilter(filterType, button) {
    if (activeFilters.has(filterType)) {
        // Nonaktifkan filter
        activeFilters.delete(filterType);
        button.classList.remove('active');
        removeFilterTag(filterType);
    } else {
        // Aktifkan filter
        activeFilters.add(filterType);
        button.classList.add('active');
        addFilterTag(filterType);
    }
    updateResults();
}

// Fungsi untuk menambah tag filter
function addFilterTag(filterType) {
    // Cek apakah tag sudah ada
    if (activeFiltersContainer.querySelector(`[data-filter="${filterType}"]`)) return;

    const tag = document.createElement('span');
    tag.className = 'filter-tag';
    tag.dataset.filter = filterType;
    tag.innerHTML = `
        ${getFilterLabel(filterType)}
        <i class="fas fa-times"></i>
    `;

    // Event listener untuk menghapus filter
    tag.addEventListener('click', () => {
        const filterBtn = document.querySelector(`.filter-btn[data-filter="${filterType}"]`);
        if (filterBtn) {
            filterBtn.classList.remove('active');
        }
        activeFilters.delete(filterType);
        tag.remove();
        updateResults();
    });

    activeFiltersContainer.appendChild(tag);
}

// Fungsi untuk menghapus tag filter
function removeFilterTag(filterType) {
    const tag = activeFiltersContainer.querySelector(`[data-filter="${filterType}"]`)?.parentElement;
    if (tag) {
        tag.remove();
    }
}

// Fungsi untuk mendapatkan label filter
function getFilterLabel(filterType) {
    const labels = {
        'quick': '<i class="fas fa-clock"></i> Express',
        'easy': '<i class="fas fa-star"></i> Pemula',
        'favorite': '<i class="fas fa-heart"></i> Favorit'
    };
    return labels[filterType] || filterType;
}

// Fungsi untuk memfilter produk
function filterProducts(products) {
    if (activeFilters.size === 0) return products;

    return products.filter(product => {
        return Array.from(activeFilters).every(filter => {
            switch(filter) {
                case 'quick':
                    return product.time === 'quick';
                case 'easy':
                    return product.difficulty === 'easy';
                case 'favorite':
                    return favorites.has(product.id);
                default:
                    return true;
            }
        });
    });
}

// Fungsi untuk pencarian
function searchProducts(query) {
    const searchTerm = query.toLowerCase().trim();
    return products.filter(product => {
        return (
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm) ||
            product.category.toLowerCase().includes(searchTerm) ||
            product.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))
        );
    });
}

// Fungsi untuk update hasil
function updateResults() {
    let filteredProducts = [...products];

    // Terapkan pencarian jika ada
    const searchQuery = searchInput.value;
    if (searchQuery.trim()) {
        filteredProducts = searchProducts(searchQuery);
    }

    // Terapkan filter aktif
    filteredProducts = filterProducts(filteredProducts);

    // Render hasil
    renderProducts(filteredProducts);
}

// Event listener untuk pencarian
searchInput?.addEventListener('input', debounce(updateResults, 300));

// Fungsi debounce untuk optimasi performa
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Fungsi untuk membuat card product
function createProductCard(product) {
    const productDiv = document.createElement('div');
    productDiv.className = 'product';
    
    productDiv.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image}" alt="${product.name}">
            <span class="product-category">${product.category}</span>
            <button class="favorite-btn" data-id="${product.id}">
                <i class="fas fa-heart" style="color: ${favorites.has(product.id) ? 'red' : '#ddd'};"></i>
            </button>
        </div>
        
        <div class="product-content">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            
            <div class="product-info">
                <span class="info-item">
                    <i class="fas fa-utensils"></i>
                    ${product.ingredients.length} Bahan
                </span>
                <span class="info-item">
                    <i class="fas fa-list"></i>
                    ${product.steps.length} Langkah
                </span>
            </div>
        </div>

        <div class="product-actions">
            <button class="action-btn view-recipe">
                Lihat Resep
            </button>
        </div>
    `;

    // Event listener untuk tombol favorite
    const favoriteBtn = productDiv.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleFavorite(product.id);
        const icon = favoriteBtn.querySelector('i');
        icon.style.color = favorites.has(product.id) ? 'red' : '#ddd';
        updateResults(); // Update hasil ketika status favorit berubah
    });

    // Event listener untuk membuka detail resep
    productDiv.querySelector('.view-recipe').addEventListener('click', () => {
        showRecipeDetails(product);
    });

    return productDiv;
}

// Fungsi untuk render products
function renderProducts(productsToRender = products) {
    const productList = document.getElementById('product-list');
    if (!productList) return;

    productList.innerHTML = ''; // Clear existing content
    
    if (productsToRender.length === 0) {
        productList.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <p>Tidak ada resep yang ditemukan</p>
            </div>
        `;
        return;
    }

    productsToRender.forEach(product => {
        productList.appendChild(createProductCard(product));
    });
}

// Fungsi toggle favorite
function toggleFavorite(productId) {
    if (favorites.has(productId)) {
        favorites.delete(productId);
    } else {
        favorites.add(productId);
    }
}

// Fungsi untuk menampilkan detail resep
function showRecipeDetails(product) {
    const modalContent = document.getElementById('modalContent');
    if (!modalContent) return;

    modalContent.innerHTML = `
        <h2>${product.name}</h2>
        <div class="recipe-details">
            <div class="recipe-info">
                <span><i class="fas fa-utensils"></i> ${product.ingredients.length} Bahan</span>
                <span><i class="fas fa-list"></i> ${product.steps.length} Langkah</span>
                <span><i class="fas fa-clock"></i> ${product.time === 'quick' ? 'Cepat' : product.time === 'medium' ? 'Sedang' : 'Lama'}</span>
                <span><i class="fas fa-signal"></i> ${product.difficulty === 'easy' ? 'Mudah' : product.difficulty === 'medium' ? 'Sedang' : 'Sulit'}</span>
            </div>
            
            <div class="ingredients-section">
                <h3><i class="fas fa-shopping-basket"></i> Bahan-bahan</h3>
                <ul class="ingredients-list">
                    ${product.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                </ul>
            </div>
            
            <div class="steps-section">
                <h3><i class="fas fa-tasks"></i> Langkah-langkah</h3>
                <ol class="steps-list">
                    ${product.steps.map(step => `<li>${step}</li>`).join('')}
                </ol>
            </div>
        </div>
    `;
    
    document.getElementById('recipeModal').style.display = 'block';
}

// Event listeners untuk modal
document.querySelector('.close')?.addEventListener('click', () => {
    document.getElementById('recipeModal').style.display = 'none';
});

window.addEventListener('click', (event) => {
    const modal = document.getElementById('recipeModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// Inisialisasi
function init() {
    handleFilters();
    renderProducts(products);
    
    // Tambahkan event listener untuk pencarian
    searchInput?.addEventListener('input', debounce(updateResults, 300));
}

// Jalankan setelah DOM loaded
document.addEventListener('DOMContentLoaded', init);
