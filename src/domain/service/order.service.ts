import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import Customer from "../entity/customer";
import {v4 as uuid} from "uuid";

export default class OrderService {
    static total(orders: Order[]): number {
        return orders.reduce((acc, order) => acc + order.getTotal(), 0);
    }

    static placeOrder(customer: Customer, items: OrderItem[]): Order {
        if (items.length === 0) {
            throw new Error('Order must have at least one item');
        }

        const order = new Order(uuid(), customer.getId(), items);
        customer.addRewardPoints(order.getTotal() / 2);
        return order;
    }
}