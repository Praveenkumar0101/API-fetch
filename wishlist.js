document.addEventListener('DOMContentLoaded', () => {
    const clearWishlistButton = document.getElementById('clear-wishlist');
    const wishlistItemsContainer = document.getElementById('wishlist-items');

    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    function saveWishlist() {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }

    function clearWishlist() {
        wishlist = [];
        saveWishlist();
        displayWishlistItems();
        alert('Wishlist has been cleared.');
    }

    function displayWishlistItems() {
        wishlistItemsContainer.innerHTML = '';
        wishlist.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('wishlist-item');
            
            const itemImage = document.createElement('img');
            itemImage.src = item.image;
            itemDiv.appendChild(itemImage);

            const itemInfo = document.createElement('div');
            itemInfo.textContent = `${item.title} - ${item.price}`;
            itemDiv.appendChild(itemInfo);

            wishlistItemsContainer.appendChild(itemDiv);
        });
    }

    if (clearWishlistButton) {
        clearWishlistButton.addEventListener('click', clearWishlist);
    }

    displayWishlistItems();
});
