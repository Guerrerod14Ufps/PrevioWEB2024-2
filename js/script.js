// JSON de login
const validUser = {
    username: "mor_2314",
    password: "83r5^_"
};

// Manejar el login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    if (usernameInput === validUser.username && passwordInput === validUser.password) {
        window.location.href = 'dashboard.html';  // Redirige a la página de productos
    } else {
        errorMessage.textContent = 'Invalid username or password';
    }
});

// Cargar productos y categorías en dashboard.html
if (window.location.pathname.includes('dashboard.html')) {
    const productList = document.getElementById('productList');
    const categoryFilters = document.getElementById('categoryFilters');
    const searchInput = document.getElementById('searchInput');
    
    let products = [];

    // Obtener los productos desde la API
    fetch('https://fakestoreapi.com/products')
        .then(response => response.json())
        .then(data => {
            products = data;
            displayProducts(products);
        });

    // Obtener las categorías desde la API y crear botones de filtro
    fetch('https://fakestoreapi.com/products/categories')
        .then(response => response.json())
        .then(categories => {
            loadCategories(categories);
        });

    // Función para mostrar los productos
    function displayProducts(products) {
        productList.innerHTML = '';
        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <p>${product.title}</p>
                <span>$${product.price}</span>
            `;
            productList.appendChild(productCard);
        });
    }

    // Cargar botones de categorías
    function loadCategories(categories) {
        categories.forEach(category => {
            const categoryButton = document.createElement('button');
            categoryButton.textContent = category;
            categoryButton.addEventListener('click', () => filterByCategory(category));
            categoryFilters.appendChild(categoryButton);
        });
    }

    // Filtrar productos por categoría
    function filterByCategory(category) {
        const filteredProducts = products.filter(product => product.category === category);
        displayProducts(filteredProducts);
    }

    // Filtrar productos por búsqueda
    searchInput.addEventListener('input', () => {
        const query = searchInput.value.toLowerCase();
        const filteredProducts = products.filter(product => product.title.toLowerCase().includes(query));
        displayProducts(filteredProducts);
    });
}
