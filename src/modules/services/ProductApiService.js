import { Product } from '../entities/Product.js';

export default class ProductServiceApi {
    constructor(endpoint) {
        this.endpoint = endpoint;
    }

    async getAll() {
        const result = await fetch(this.endpoint);

        if (!result.ok) {
            throw new Error(`HTTP ${result.statusText}`);
        }

        const parsed = await result.json();
        const productItems = parsed.data.map(data => new Product(data));

        return productItems;
    }
}
