import Product from "./product";

describe("Product Unit Tests", () => {

    it("should throw an error if product ID is missing", () => {
        expect(() => {
            const product = new Product("", "Gadget", 15);
        }).toThrow("Customer ID must be provided.");
    });

    it("should throw an error if product name is missing", () => {
        expect(() => {
            const product = new Product("prod-01", "", 15);
        }).toThrow("Customer name must be provided.");
    });

    it("should throw an error if price is zero", () => {
        expect(() => {
            const product = new Product("prod-02", "Gadget", 0);
        }).toThrow("Price must be greater than zero.");
    });

    it("should update the product name correctly", () => {
        const product = new Product("prod-03", "Gadget", 15);
        product.changeName("Widget");
        expect(product.getName()).toBe("Widget");
    });

    it("should update the product price correctly", () => {
        const product = new Product("prod-04", "Gadget", 15);
        product.changePrice(30);
        expect(product.getPrice()).toBe(30);
    });
});
