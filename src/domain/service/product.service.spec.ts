import Product from "../entity/product";
import ProductService from "./product.service";


describe("Product Service Unit Test", () => {

    it("should change the price of all products", () => {
        
        const p1 = new Product("Product 1", "Product 1", 100);
        const p2 = new Product("Product 2", "Product 2", 200);
        const products = [p1, p2];

        ProductService.increasePrice(products, 10);

        expect(p1.price).toBe(110.0);
        expect(p2.price).toBe(220.0);
    });
    
});