import ProductServiceApi from './src/modules/services/ProductApiService';

const API_URL =
    'https://raw.githubusercontent.com/Sellfy/test-assignment-frontend/refs/heads/master/products.json';

const productItems = new ProductServiceApi(API_URL);

console.log(productItems);
