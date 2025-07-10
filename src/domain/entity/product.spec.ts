import Product from './product';

describe('Product entity tests', () => {
  it('should throw an error if ID is empty', () => {
    expect(() => new Product('', 'test-product', 1)).toThrow("id cannot be empty");
  });

  it('should throw an error if name is empty', () => {
    expect(() => new Product('1', '', 1)).toThrow("name cannot be empty");
  });

  it('should throw an error if price is zero or negative', () => {
    expect(() => new Product('1', 'test-product', 0)).toThrow("price must be greater than zero");
  });

  it('should update the product name', () => {
    const product = new Product('1', 'test-product', 1);
    product.changeName('test-product-updated');
    expect(product.name).toBe('test-product-updated');
  });

  it('should throw an error if name is empty after update', () => {
    const product = new Product('1', 'test-product', 1);
    expect(() => product.changeName('')).toThrow("name cannot be empty");
  });

  it('should update the product price', () => {
    const product = new Product('1', 'test-product', 1);
    product.changePrice(10);
    expect(product.price).toBe(10);
  });

  it('should throw an error if price is zero or negative after update', () => {
    const product = new Product('1', 'test-product', 1);
    expect(() => product.changePrice(0)).toThrow("price must be greater than zero");
    expect(() => product.changePrice(-1)).toThrow("price must be greater than zero");
  });
});
