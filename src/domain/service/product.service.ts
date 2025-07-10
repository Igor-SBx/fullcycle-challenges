import Product from '../entity/product';

export default class ProductService {
  static changePrice(products: Product[], percentage: number) {
    products.forEach(product => {
      product.changePrice((product.price * percentage) / 100 + product.price);
    });
  }
}