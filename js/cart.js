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
        const productPrice = item.price; // Precio unitario
        const quantity = item.quantity; // Cantidad
        const totalItemPrice = productPrice * quantity; // Precio total por item

        // Crear una fila en la tabla
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.title}</td>
            <td>${quantity}</td>
            <td>$${productPrice.toFixed(2)}</td>
            <td>$${totalItemPrice.toFixed(2)}</td>
        `;
        cartItemsContainer.appendChild(row);
        
        totalPrice += totalItemPrice; // Calcular precio total
    });

    totalPriceContainer.innerHTML = `<h3>Precio Total Carrito: $${totalPrice.toFixed(2)}</h3>`;
}

// Manejar el botón para limpiar el carrito
document.getElementById('clearCartButton').addEventListener('click', () => {
    const cartItemsContainer = document.getElementById('cartItems');
    const totalPriceContainer = document.getElementById('totalPrice');

    cartItemsContainer.innerHTML = ''; // Limpiar carrito
    totalPriceContainer.innerHTML = ''; // Limpiar precio total
    alert('Carrito limpiado');
});
