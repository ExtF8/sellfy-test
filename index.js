import ProductServiceApi from './src/modules/services/ProductApiService.js';
import ProductListView from './src/modules/views/ProductListView.js';
import ShareModalView from './src/modules/views/ShareModalView.js';

// App controller
class AppController {
    constructor() {
        const API_URL =
            'https://raw.githubusercontent.com/Sellfy/test-assignment-frontend/refs/heads/master/products.json';
        const app = document.getElementById('app');
        this.productItems = new ProductServiceApi(API_URL);
        this.products = [];
        this.modal = new ShareModalView();
        this.view = new ProductListView(app, {
            onShare: product => this.modal.open(product),
            onDelete: product => this.deleteProduct(product.id),
        });
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
}

// Init app
new AppController().init();
