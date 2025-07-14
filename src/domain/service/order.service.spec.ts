import Customer from "../entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service Unit Test", () => {
    
    it("should get total of all orders", () => {
        
        // constructor parameters fixed: id, productId, name, price, quantity
        const item1 = new OrderItem("1", "p1", "item1", 10, 2);
        const item2 = new OrderItem("2", "p2", "item2", 20, 3);
        const item3 = new OrderItem("3", "p3", "item3", 30, 4);
        const item4 = new OrderItem("4", "p4", "item4", 40, 5);

        const order1 = new Order("1", "1", [item1, item2]);
        const order2 = new Order("2", "2", [item3, item4]);
        const orders = [order1, order2];

        expect(OrderService.total(orders)).toBe(400);

    });

    it("should place an order", () => {
        
        const customer = new Customer("1", "customer1");
        const item1 = new OrderItem("1", "p1", "item1", 10, 2);
        const item2 = new OrderItem("2", "p2", "item2", 20, 3);
        const items = [item1, item2];

        const orderPlaced = OrderService.placeOrder(customer, items);
        expect(orderPlaced.getTotal()).toBe(80);
        expect(customer.getRewardPoints()).toBe(40);
    }); 
});
