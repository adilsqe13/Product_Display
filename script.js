
const url = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json'


fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }
        return response.json();
    })
    .then(data => {
        console.log(data.categories);
        mens = data.categories[0].category_products
        womens = data.categories[1].category_products
        kids = data.categories[2].category_products

        // Function to create a product card element
        function createProductCard(product) {
            const card = document.createElement('div');
            card.classList.add('card');
            card.innerHTML = `
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-details">
                <span class="badge">${product.badge_text}</span>
                <h2 class="product-title">${product.title}</h2>
                <p class="brand">${product.vendor}</p>
                <div class="price-details">
                    <p class="price"><small style="color:black;">$</small>${product.price}</p>
                    <strike class="compare-price">$${product.compare_at_price}</strike>
                    <span class='discount'>50% off</span>
                </div>
                <button class='add-to-cart-btn'>Add to cart</button>
            </div>
        `;

            return card;
        }

        // Function to render product cards based on category
        function renderProductCards(category) {
            const container = document.getElementById('card-container');
            container.innerHTML = ''; // Clear previous cards

            let products;
            switch (category) {
                case 'mens':
                    products = mens;
                    break;
                case 'womens':
                    products = womens;
                    break;
                case 'kids':
                    products = kids;
                    break;
                default:
                    products = [];
            }

            products.forEach(product => {
                const card = createProductCard(product);
                container.appendChild(card);
            });
        }

        // Event listeners for button clicks
        document.getElementById('mensBtn').addEventListener('click', function () {
            renderProductCards('mens');
            resetButtonColors();
            this.style.backgroundColor = 'rgb(28, 28, 28)';
            this.style.color = 'white';
        });

        document.getElementById('womensBtn').addEventListener('click', function () {
            renderProductCards('womens');
            resetButtonColors();
            this.style.backgroundColor = 'rgb(28, 28, 28)';
            this.style.color = 'white';
        });

        document.getElementById('kidsBtn').addEventListener('click', function () {
            renderProductCards('kids');
            resetButtonColors();
            this.style.backgroundColor = 'rgb(28, 28, 28)';
            this.style.color = 'white';
        });

        // Function to reset button colors
        function resetButtonColors() {
            const buttons = document.querySelectorAll('a');
            buttons.forEach(button => {
                button.style.backgroundColor = ''; // Reset background color
                button.style.color = ''; // Reset text color
            });
        }

        // Initial render
        renderProductCards('mens');


    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('output').innerHTML = 'Error fetching data: ' + error.message;
    });




