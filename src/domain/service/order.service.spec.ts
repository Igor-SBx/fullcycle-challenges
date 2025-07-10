import Customer from '../entity/customer';
import Order from '../entity/order';
import OrderItem from '../entity/order_item';
import OrderService from './order.service';

describe('OrderService unit tests', () => {
  it('should correctly calculate the total amount for multiple orders', () => {
    const item1 = new OrderItem('test-id-order-item-1', 'test-id-item-1', 'test-item-name-1', 25, 4);
    const item2 = new OrderItem('test-id-order-item-2', 'test-id-item-2', 'test-item-name-1', 80, 5);

    const order1 = new Order('test-id-order-1', 'test-customer-id-1', [item1]);
    const order2 = new Order('test-id-order-2', 'test-customer-id-2', [item2]);

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(500);
  });

  it('should add reward points to the customer when an order is placed', () => {
    const customer = new Customer('test-customer-id-1', 'Customer One');

    const item1 = new OrderItem('test-id-order-item-1', 'test-id-item-1', 'test-item-name-1', 12, 5);
    const item2 = new OrderItem('test-id-order-item-2', 'test-id-item-2', 'test-item-name-2', 6, 10);

    const order = OrderService.placeOrder(customer, [item1, item2]);

    expect(customer.rewardPoints).toBe(60);
    expect(order.total()).toBe(120);
  });
});
