export default class OrderItem {
    private readonly id: string;
    private readonly name: string;
    private readonly productId: string;
    private readonly price: number;
    private readonly quantity: number;

    constructor(
        id: string,
        productId: string,
        name: string,
        price: number,
        quantity: number
    ) {
        this.id = id;
        this.productId = productId;
        this.name = name;
        this.price = price;
        this.quantity = quantity;

        this.validate();
    }

    private validate(): void {
        if (!this.id) {
            throw new Error("Order item ID must be provided.");
        }
        if (!this.productId) {
            throw new Error("Product ID must be provided.");
        }
        if (!this.name) {
            throw new Error("Product name must be provided.");
        }
        if (this.price <= 0) {
            throw new Error("Price must be greater than zero.");
        }
        if (this.quantity <= 0) {
            throw new Error("Quantity must be greater than zero.");
        }
    }

    getId(): string {
        return this.id;
    }

    getProductId(): string {
        return this.productId;
    }

    getName(): string {
        return this.name;
    }

    getPrice(): number {
        return this.price;
    }

    getQuantity(): number {
        return this.quantity;
    }

    getTotal(): number {
        return this.price * this.quantity;
    }
}
