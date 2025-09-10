import { Product } from '../entities/Product';

export default class ProductServiceApi {
    consturctor(endpoint) {
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
