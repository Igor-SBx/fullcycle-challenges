import Order from './order';
import OrderItem from './order_item';

describe('Order entity tests', () => {
  it('should throw an error if order id is missing', () => {
    expect(() => new Order('', 'test-customer', [])).toThrow("id cannot be empty");
  });

  it('should throw an error if customer id is missing', () => {
    expect(() => new Order('test-order', '', [])).toThrow("customer id cannot be empty");
  });

  it('should throw an error if no items are provided', () => {
    expect(() => new Order('test-order', 'test-customer', [])).toThrow("items cannot be empty");
  });

  it('should correctly calculate the total order value', () => {
    const item1 = new OrderItem('1', 'prod-1', 'Product 1', 100, 1);
    const item2 = new OrderItem('2', 'prod-2', 'Product 2', 500, 3);
    const order = new Order('test-order', 'test-customer', [item1, item2]);

    expect(order.total).toBe(1600);
  });
});
