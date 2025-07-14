import OrderItem from './order_item';

export default class Order {
    private readonly id: string;
    private customerId: string;
    private items: OrderItem[];
    private totalAmount: number = 0;

    constructor(id: string, customerId: string, items: OrderItem[]) {
        this.id = id;
        this.customerId = customerId;
        this.items = [...items];
        this.totalAmount = this.calculateTotal();
        this.validate();
    }

    private validate(): void {
        if (!this.id) {
            throw new Error("Order ID must be provided.");
        }

        if (!this.customerId) {
            throw new Error("Customer ID must be provided.");
        }

        if (this.items.length === 0) {
            throw new Error("The order must contain at least one item.");
        }

        const ids = this.items.map(item => item.getId());
        const uniqueIds = new Set(ids);
        if (ids.length !== uniqueIds.size) {
            throw new Error("Each order item must have a unique ID.");
        }

        const hasInvalidQuantity = this.items.some(item => item.getQuantity() <= 0);
        if (hasInvalidQuantity) {
            throw new Error("Each item must have a quantity greater than zero.");
        }
    }

    getId(): string {
        return this.id;
    }

    getCustomerId(): string {
        return this.customerId;
    }

    getItems(): OrderItem[] {
        return [...this.items];
    }

    calculateTotal(): number {
        return this.items.reduce((sum, item) => sum + item.getTotal(), 0);
    }

    getTotal(): number {
        return this.totalAmount;
    }

    addItem(item: OrderItem): void {
        this.items.push(item);
        this.totalAmount = this.calculateTotal();
        this.validate();
    }

    removeItem(itemId: string): void {
        const index = this.items.findIndex(item => item.getId() === itemId);

        if (index === -1) {
            throw new Error("Item not found in order.");
        }

        if (this.items.length === 1) {
            throw new Error("An order must have at least one item.");
        }

        this.items.splice(index, 1);
        this.totalAmount = this.calculateTotal();
    }

    changeCustomer(newCustomerId: string): void {
        if (!newCustomerId) {
            throw new Error("New customer ID must be provided.");
        }
        this.customerId = newCustomerId;
    }
}
