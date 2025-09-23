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

    formatPrice(locale) {
        const major = this.price / 100;
        try {
            return new Intl.NumberFormat(locale, {
                style: 'currency',
                currency: this.currency,
            }).format(major);
        } catch {
            return `${major.toFixed(2)} ${this.currency}`;
        }
    }
}
