document.addEventListener('DOMContentLoaded', () => {
    cargarProductos();
    carrito.cargarCarrito();
});

const productos = [
    { id: 1, nombre: 'Producto 1', precio: 100, imagen: './img/14.png' },
    { id: 2, nombre: 'Producto 2', precio: 200, imagen: './img/14.png' },
    { id: 3, nombre: 'Producto 3', precio: 100, imagen: './img/14.png' },
    { id: 4, nombre: 'Producto 4', precio: 200, imagen: './img/14.png' },
    { id: 5, nombre: 'Producto 5', precio: 100, imagen: './img/14.png' },
    { id: 6, nombre: 'Producto 6', precio: 200, imagen: './img/14.png' },
    { id: 7, nombre: 'Producto 7', precio: 100, imagen: './img/14.png' },
    { id: 8, nombre: 'Producto 8', precio: 200, imagen: './img/14.png' },
    { id: 9, nombre: 'Producto 9', precio: 100, imagen: './img/14.png' },
    { id: 10, nombre: 'Producto 10', precio: 200, imagen: './img/9.png' }
];

function cargarProductos() {
    const contenedorProductos = document.getElementById('product-container');
    productos.forEach(producto => {
        const divProducto = document.createElement('div');
        divProducto.classList.add('product-item');
        divProducto.innerHTML = `
            <img class"productoImg" src="${producto.imagen}" alt="${producto.nombre}">
            <h3 class="product-name">${producto.nombre}</h3>
            <p class="product-price">$${producto.precio}</p>
            <button onclick="carrito.agregarProducto(${producto.id}, 1)">Añadir al Carrito</button>
        `;
        contenedorProductos.appendChild(divProducto);
    });
}

const carrito = {
    items: {},
    agregarProducto(idProducto, cantidad = 1) {
        console.log('adding', idProducto)
        const producto = productos.find(p => p.id === idProducto);
        console.log('product', producto)
        if (!producto) return; 
        
        if (this.items[idProducto]) {
            this.items[idProducto].cantidad += cantidad;
        } else {
            this.items[idProducto] = { ...producto, cantidad: cantidad };
        }
        this.actualizarCarrito();
    },
    eliminarProducto(idProducto) {
        console.log('eliminating product', idProducto)
        if (!this.items[idProducto]) return; 

        if (this.items[idProducto].cantidad > 1) {
            this.items[idProducto].cantidad--;
        } else {
            delete this.items[idProducto];
        }
        this.actualizarCarrito();
    },
    actualizarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.items));
        this.mostrarCarrito();
    },
    cargarCarrito() {
        console.log('loading cart')
        this.items = JSON.parse(localStorage.getItem('carrito')) || {};
        console.log('items in cart', this.items)
        this.mostrarCarrito();
    },
    mostrarCarrito() {
        const contenedorCarrito = document.getElementById('cart-items');
        contenedorCarrito.innerHTML = ''; // Limpiar contenido
        let total = 0;
        for (const idProducto in this.items) {
            const { nombre, precio, cantidad } = this.items[idProducto];
            total += precio * cantidad;
            contenedorCarrito.innerHTML += `
                <div class="cart-item">
                    <p>${nombre} - Cantidad: ${cantidad} x $${precio} = $${precio * cantidad}</p>
                    <button onclick="carrito.eliminarProducto(${idProducto})">Eliminar</button>
                </div>
            `;
        }
        document.getElementById('cart-total').textContent = total.toFixed(2);
    },
    finalizarCompra() {
        carrito.items = {};
        carrito.actualizarCarrito();

        document.getElementById('product-container').innerHTML = '<h2>Gracias por tu compra. Tu pedido está en camino!</h2>';
    }
};

function agregarAlCarrito(idProducto) {
    carrito.agregarProducto(idProducto);
}

document.getElementById('checkout-button').addEventListener('click', carrito.finalizarCompra);