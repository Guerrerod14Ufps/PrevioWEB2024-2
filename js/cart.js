// Cargar los productos del carrito
fetch('https://fakestoreapi.com/carts/1')
    .then(response => response.json())
    .then(cart => {
        // Obtener los productos del carrito
        const productPromises = cart.products.map(item => 
            fetch(`https://fakestoreapi.com/products/${item.productId}`)
                .then(res => res.json())
                .then(product => ({ ...product, quantity: item.quantity })) // Agregar la cantidad
        );

        // Esperar a que se resuelvan todas las promesas
        return Promise.all(productPromises);
    })
    .then(products => {
        displayCartItems(products); // Pasar el array de productos obtenidos
    })
    .catch(error => {
        console.error('Error al cargar el carrito:', error);
    });

// Función para mostrar los productos en el carrito
function displayCartItems(products) {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceContainer = document.getElementById('totalPrice');
    
    cartItemsContainer.innerHTML = ''; // Limpiar contenido previo
    let totalPrice = 0;

    products.forEach(item => {
        const productCard = document.createElement('div');
        productCard.classList.add('cart-item');
        productCard.innerHTML = `
            <img src="${item.image}" alt="${item.title}">
            <p>${item.title}</p>
            <span>Precio: $${item.price}</span>
            <span>Cantidad: ${item.quantity}</span>
        `;
        cartItemsContainer.appendChild(productCard);
        
        totalPrice += item.price * item.quantity; // Calcular precio total
    });

    totalPriceContainer.innerHTML = `<h3>Precio Total: $${totalPrice.toFixed(2)}</h3>`;
}

// Manejar el botón para limpiar el carrito
document.getElementById('clearCartButton').addEventListener('click', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceContainer = document.getElementById('totalPrice');

    cartItemsContainer.innerHTML = ''; // Limpiar carrito
    totalPriceContainer.innerHTML = ''; // Limpiar precio total
    alert('Carrito limpiado');
});
