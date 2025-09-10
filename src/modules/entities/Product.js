export class Product {
    constructor(data) {
        this.id = data._id;
        this.price = Number(data.price);
        this.currency = data.currency;
        this.name = data.name;
        this.description = data.description;
        this.category = data.category;
        this.url = data.url;
        this.imageUrl = data.image_url;
    }
}
