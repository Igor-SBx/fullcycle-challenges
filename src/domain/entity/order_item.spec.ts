import OrderItem from './order_item';

describe('OrderItem entity tests', () => {
  it('should throw an error if id is not provided', () => {
    expect(() => new OrderItem('', 'test-id', 'test-product', 5, 1)).toThrow("id cannot be empty");
  });

  it('should throw an error if product id is missing', () => {
    expect(() => new OrderItem('1', '', 'test-product', 5, 1)).toThrow("product id cannot be empty");
  });

  it('should throw an error if name is not set', () => {
    expect(() => new OrderItem('1', 'test-id', '', 5, 1)).toThrow("name cannot be empty");
  });

  it('should throw an error if price is zero or negative', () => {
    expect(() => new OrderItem('1', 'test-id', 'test-product', 0, 1)).toThrow("price must be greater than zero");
  });

  it('should throw an error if quantity is zero or negative', () => {
    expect(() => new OrderItem('1', 'test-id', 'test-product', 5, 0)).toThrow("Quantity must be greater than zero");
  });

  it('should return the correct total value for the item', () => {
    const item = new OrderItem('1', 'test-id', 'test-product', 5, 3);
    expect(item.orderItemTotal()).toBe(15);
  });
});
