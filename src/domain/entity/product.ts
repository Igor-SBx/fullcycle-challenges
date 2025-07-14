export default class Product {
    private readonly id: string;
    private name: string;
    private price: number;

    constructor(id: string, name: string, price: number) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.validate();
    }

    private validate(): void {
        if (!this.id) {
            throw new Error("Product Customer ID must be provided..");
        }
        if (!this.name) {
            throw new Error("Product Customer name must be provided..");
        }
        if (this.price <= 0) {
            throw new Error("Price must be greater than zero.");
        }
    }

    getId(): string {
        return this.id;
    }

    getName(): string {
        return this.name;
    }

    changeName(newName: string): void {
        this.name = newName;
        this.validate();
    }

    getPrice(): number {
        return this.price;
    }

    changePrice(newPrice: number): void {
        this.price = newPrice;
        this.validate();
    }
}
