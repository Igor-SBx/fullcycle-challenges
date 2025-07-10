import { Sequelize } from 'sequelize-typescript';
import ProductModel from '../db/sequelize/model/product.model';
import Product from '../../domain/entity/product';
import ProductRepository from './product.repository';

describe('ProductRepository integration tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ProductModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new product', async () => {
    const repository = new ProductRepository();
    const product = new Product('product-test-1', 'product test', 200);

    await repository.create(product);

    const dbProduct = await ProductModel.findOne({ where: { id: 'product-test-1' } });

    expect(dbProduct.toJSON()).toStrictEqual({
      id: 'product-test-1',
      name: 'product test',
      price: 200,
    });
  });

  it('should update an existing product', async () => {
    const repository = new ProductRepository();
    const product = new Product('product-test-1', 'product test', 10);

    await repository.create(product);

    product.changeName('Updated product test');
    product.changePrice(750);
    await repository.update(product);

    const dbProduct = await ProductModel.findOne({ where: { id: 'product-test-1' } });

    expect(dbProduct.toJSON()).toStrictEqual({
      id: 'product-test-1',
      name: 'Updated product test',
      price: 750,
    });
  });

  it('should find a product by ID', async () => {
    await ProductModel.create({
      id: 'product-test-1',
      name: 'product test',
      price: 125,
    });

    const repository = new ProductRepository();
    const product = await repository.find('product-test-1');

    expect(product.id).toBe('product-test-1');
    expect(product.name).toBe('product test');
    expect(product.price).toBe(125);
  });

  it('should return all products', async () => {
    await ProductModel.create({ id: 'product-test-1', name: 'product test', price: 20 });
    await ProductModel.create({ id: 'product-test-2', name: 'product test 2', price: 30 });

    const repository = new ProductRepository();
    const products = await repository.findAll();

    expect(products).toHaveLength(2);

    expect(products[0].id).toBe('product-test-1');
    expect(products[0].name).toBe('product test');
    expect(products[0].price).toBe(20);

    expect(products[1].id).toBe('product-test-2');
    expect(products[1].name).toBe('Pproduct test 2');
    expect(products[1].price).toBe(30);
  });
});
