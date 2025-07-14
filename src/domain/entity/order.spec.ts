import Order from "./order";
import OrderItem from "./order_item";

describe("Order Unit Tests", () => {

    it("should throw an error if order ID is missing", () => {
        expect(() => new Order("", "cust-100", [])).toThrow("Order ID must be provided.");
    });

    it("should throw an error if customer ID is missing", () => {
        expect(() => new Order("order-001", "", [])).toThrow("Customer ID must be provided.");
    });

    it("should throw an error if the order has no items", () => {
        expect(() => new Order("order-002", "cust-101", [])).toThrow("The order must contain at least one item.");
    });

    it("should correctly calculate the total price of the order", () => {
        const itemA = new OrderItem("item-A", "prod-1", "Product A", 15, 2);
        const itemB = new OrderItem("item-B", "prod-2", "Product B", 25, 1);
        const order = new Order("order-003", "cust-102", [itemA, itemB]);
        expect(order.getTotal()).toBe(55);
    });

    it("should throw an error if any item has a quantity of zero", () => {
        expect(() => new OrderItem("item-C", "prod-3", "Product C", 50, 0)).toThrow("Quantity must be greater than zero.");
    });

    it("should throw an error if there are duplicate item IDs in the order", () => {
        const item1 = new OrderItem("item-D", "prod-4", "Product D", 40, 1);
        const item2 = new OrderItem("item-D", "prod-5", "Product E", 30, 1);
        expect(() => new Order("order-005", "cust-104", [item1, item2])).toThrow("Each order item must have a unique ID.");
    });
});
