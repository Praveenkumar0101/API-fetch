document.addEventListener('DOMContentLoaded', () => {
    const productContainer = document.getElementById('product-container');
    const categoryButtons = document.querySelectorAll('#category-buttons button');

    let allProducts = [];

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
        })
        .catch(error => console.error('Error fetching data:', error));

    function displayProducts(category) {
        productContainer.innerHTML = '';  // Clear existing products

        const filteredProducts = allProducts.filter(product => product.category === category);

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

            productContainer.appendChild(productDiv);
        });
    }
});
