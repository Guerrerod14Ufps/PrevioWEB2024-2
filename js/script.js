// Manejar el login
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();

    const usernameInput = document.getElementById('username').value;
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('error-message');

    // Realizar la solicitud de inicio de sesión
    fetch('https://fakestoreapi.com/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido
        },
        body: JSON.stringify({
            username: usernameInput,
            password: passwordInput
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error('Login failed');
        }
        return res.json();
    })
    .then(json => {
        console.log(json); // Aquí puedes manejar la respuesta del login (ej. el token)
        window.location.href = 'dashboard.html';  // Redirige a la página de productos
    })
    .catch(error => {
        errorMessage.textContent = 'Invalid username or password'; // Mensaje de error en caso de fallo
        console.error('Error:', error);
    });
});


// Cargar productos y categorías en dashboard.html
if (window.location.pathname.includes('dashboard.html')) {
    const productList = document.getElementById('productList');
    const categoryFilters = document.getElementById('categoryFilters');
    const viewCartButton = document.getElementById('viewCartButton');
    
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
    productList.innerHTML = ''; // Limpia la lista de productos
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        //console.log(product);

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <p>${product.title}</p>
            <span>$${product.price}</span>
            <button onclick='addToCart(${JSON.stringify(product).replace(/'/g, "\\'")})'>Agregar al carrito</button>
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

    // Almacenamos el carrito en el LocalStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para agregar un producto al carrito
    window.addToCart = function(product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        alert(`${product.title} añadido al carrito!`);
    };

    // Manejar el botón de ver carrito
    viewCartButton.addEventListener('click', () => {
        window.location.href = 'cart.html'; // Redirige a la página del carrito
    });
}
