document.addEventListener('DOMContentLoaded', () => {
    const cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const categoryLinks = document.querySelectorAll('.category');
    const products = document.querySelectorAll('.product');
    const checkoutButton = document.getElementById('checkout-button');
    const customerName = document.getElementById('name');
    const customerAge = document.getElementById('age');
    const customerEmail = document.getElementById('email');
    const customerContact = document.getElementById('contact');

    function addToCart(name, price) {
        const existingItem = cart.find(item => item.name === name);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({ name, price, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(name) {
        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex > -1) {
            cart[itemIndex].quantity--;
            if (cart[itemIndex].quantity === 0) {
                cart.splice(itemIndex, 1);
            }
            updateCart();
        }
    }

    function updateCart() {
        cartItems.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const li = document.createElement('li');
            li.textContent = `${item.name} - ₱${item.price} x ${item.quantity}`;
            const removeBtn = document.createElement('button');
            removeBtn.textContent = 'Remove';
            removeBtn.style.marginLeft = '10px';
            removeBtn.addEventListener('click', () => removeFromCart(item.name));
            li.appendChild(removeBtn);
            cartItems.appendChild(li);
            total += item.price * item.quantity;
        });
        cartTotal.textContent = total.toFixed(2);
    }

    function clearCart() {
        cart.length = 0;
        updateCart();
    }

    function filterProducts(category) {
        products.forEach(product => {
            if (category === 'all' || product.getAttribute('data-category') === category) {
                product.style.display = 'flex';
            } else {
                product.style.display = 'none';
            }
        });
    }

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', () => {
            const name = button.getAttribute('data-name');
            const price = parseFloat(button.getAttribute('data-price'));
            addToCart(name, price);
        });
    });

    clearCartBtn.addEventListener('click', clearCart);

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            filterProducts(category);
        });
    });

    filterProducts('all');

    document.querySelectorAll('.product-name').forEach(product => {
        product.addEventListener('click', () => {
            const description = product.nextElementSibling;
            description.classList.toggle('show');
        });
    });

    checkoutButton.addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const age = parseInt(document.getElementById('age').value);
        const address = document.getElementById('address').value;
        const email = document.getElementById('email').value;
        const contact = document.getElementById('contact').value;

        if (age < 18) {
            alert('You must be 18 or older to purchase alcohol.');
            return;
        }

        if (name && age && address && email && contact) {
            alert(`Checkout successful! \nName: ${name}\nAge: ${age}\nAddress: ${address}\nEmail: ${email}\nContact: ${contact}`);
        } else {
            alert('Please fill out all required fields.');
        }
    });

    // Handle clear cart button click
    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        renderCart();
    });
});