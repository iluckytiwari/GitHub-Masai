async function fetchProducts() {
    const category = document.getElementById('category').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;
    const productsContainer = document.getElementById('products');
    const loading = document.getElementById('loading');
    const error = document.getElementById('error');
    
    productsContainer.innerHTML = '';
    loading.style.display = 'block';
    error.style.display = 'none';
    
    let apiUrl = `https://mockapi.io/products?category=${category}`;
    if (minPrice) apiUrl += `&min_price=${minPrice}`;
    if (maxPrice) apiUrl += `&max_price=${maxPrice}`;
    apiUrl += '&sort=asc';
    
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        loading.style.display = 'none';
        
        if (data.length === 0) {
            productsContainer.innerHTML = '<p>No products found.</p>';
            return;
        }
        
        data.forEach(product => {
            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <p><strong>${product.name}</strong></p>
                <p>Price: $${product.price}</p>
            `;
            productsContainer.appendChild(productDiv);
        });
    } catch (err) {
        loading.style.display = 'none';
        error.style.display = 'block';
    }
}
