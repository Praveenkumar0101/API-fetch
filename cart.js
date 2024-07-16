document.addEventListener('DOMContentLoaded', () => {
    const clearCartButton = document.getElementById('clear-cart');
    const cartItemsContainer = document.getElementById('cart-items');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function clearCart() {
        cart = [];
        saveCart();
        displayCartItems();
        alert('Cart has been cleared.');
    }

    function displayCartItems() {
        cartItemsContainer.innerHTML = '';
        cart.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');
            
            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemDiv.appendChild(itemImage);

            const itemInfo = document.createElement('div');
            itemInfo.textContent = `${item.title} - ${item.price}`;
            itemDiv.appendChild(itemInfo);

            cartItemsContainer.appendChild(itemDiv);
        });
    }

    if (clearCartButton) {
        clearCartButton.addEventListener('click', clearCart);
    }

    displayCartItems();
});
