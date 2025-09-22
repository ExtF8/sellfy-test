import ProductServiceApi from './src/modules/services/ProductApiService';
import ProductListView from './src/modules/views/ProductListView';

// App controller
class AppController {
    constructor() {
        const API_URL =
            'https://raw.githubusercontent.com/Sellfy/test-assignment-frontend/refs/heads/master/products.json';
        const app = document.getElementById('app');
        this.productItems = new ProductServiceApi(API_URL);
        this.products = [];
        (this.view = new ProductListView(app)),
            {
                onShare: product => this.shareProduct(product),
                onDelete: product => this.deleteProduct(product.id),
            };
    }

    // Initialize app
    async init() {
        this.view.showLoading();
        try {
            this.products = await this.productItems.getAll();
            this.view.render(this.products);
        } catch (error) {
            this.view.showError(error.message || 'Failed to load products', () => this.init());
        }
    }

    // Delete product
    deleteProduct(id) {
        this.products = this.products.filter(product => product.id !== id);
        this.view.render(this.products);
    }

    // Share product
    async shareProduct(product) {
        const url = product.url;
        const text = `${product.name} - ${product.decription}`;

        if (navigator.share) {
            try {
                await navigator.share({
                    title: product.name,
                    text,
                    url,
                });
                return;
            } catch (error) {
                console.log('Error sharing product: ', error);
            }
        }
        try {
            await navigator.clipboard.writeText(url);
            alert('Link copied');
        } catch {
            alert(url);
        }
    }
}

// Init app
new AppController().init;
