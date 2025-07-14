import Product from "../entity/product";

export default class ProductService {
    
    static increasePrice(products: Product[], percentage: number): void {
        products.forEach(product => {
            const newPrice = Math.round(product.getPrice() * (1 + percentage/100));
            product.changePrice(newPrice);
        });
    }
}