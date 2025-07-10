import Product from '../entity/product';
import ProductService from './product.service';

describe('Product service unit tests', () => {
  it('Should change the price of all products', () => {
    const product1 = new Product('1', 'test-product-1', 20);
    const product2 = new Product('2', 'test-product-2', 35);

    ProductService.changePrice([product1, product2], 75);

    expect(product1.price).toBe(35);
    expect(product2.price).toBe(61.25);
  })
})