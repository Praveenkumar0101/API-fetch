document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const categoryButtons = document.querySelectorAll('#category-buttons button');
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    
    let allProducts = [];
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

    fetch('https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched Data:", data);  // Log the fetched data for inspection
            if (data.categories && Array.isArray(data.categories)) {
                // Flatten the products from each category into allProducts
                allProducts = data.categories.flatMap(category => {
                    return category.category_products.map(product => ({
                        ...product,
                        category: category.category_name  // Add category name to each product
                    }));
                });
                // Display all products initially
                displayProducts('All');
            } else {
                console.error('Expected an array of categories but got:', data.categories);
                return;
            }

            categoryButtons.forEach(button => {
                button.addEventListener('click', (event) => {
                    const category = event.target.getAttribute('data-category');
                    displayProducts(category);
                });
            });

            searchButton.addEventListener('click', () => {
                const query = searchInput.value.toLowerCase();
                displayProducts('All', query);
            });
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayProducts(category, query = '') {
        productContainer.innerHTML = '';  // Clear existing products

        let filteredProducts = allProducts;
        if (category !== 'All') {
            filteredProducts = filteredProducts.filter(product => product.category === category);
        }
        if (query) {
            filteredProducts = filteredProducts.filter(product => 
                product.title.toLowerCase().includes(query) || 
                product.vendor.toLowerCase().includes(query)
            );
        }

        filteredProducts.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');

            const productImage = document.createElement('img');
            productImage.src = product.image;
            productDiv.appendChild(productImage);

            const productName = document.createElement('h3');
            productName.textContent = product.title;
            productDiv.appendChild(productName);

            const productDescription = document.createElement('p');
            productDescription.textContent = `Price: ${product.price}, Compare at: ${product.compare_at_price}, Vendor: ${product.vendor}, Badge: ${product.badge_text || 'None'}`;
            productDiv.appendChild(productDescription);

            const addToCartButton = document.createElement('button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.classList.add('add-to-cart-button');
            addToCartButton.addEventListener('click', () => addToCart(product));
            productDiv.appendChild(addToCartButton);

            const addToWishlistButton = document.createElement('button');
            addToWishlistButton.textContent = 'Add to Wishlist';
            addToWishlistButton.classList.add('add-to-wishlist-button');
            addToWishlistButton.addEventListener('click', () => addToWishlist(product));
            productDiv.appendChild(addToWishlistButton);

            productContainer.appendChild(productDiv);
        });
    }

    function addToCart(product) {
        cart.push(product);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartIcon();
        alert(`${product.title} has been added to your cart.`);
    }

    function addToWishlist(product) {
        wishlist.push(product);
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistIcon();
        alert(`${product.title} has been added to your wishlist.`);
    }

    function updateCartIcon() {
        const cartCountElement = document.getElementById('cart-count');
        const cartCount = cart.length;
        cartCountElement.textContent = cartCount;
    }

    function updateWishlistIcon() {
        const wishlistCountElement = document.getElementById('wishlist-count');
        const wishlistCount = wishlist.length;
        wishlistCountElement.textContent = wishlistCount;
    }

    // Initialize the cart and wishlist counts
    updateCartIcon();
    updateWishlistIcon();
});
