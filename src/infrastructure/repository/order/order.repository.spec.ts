import { Sequelize } from 'sequelize-typescript';
import Address from '../../../domain/entity/address';
import Customer from '../../../domain/entity/customer';
import CustomerModel from '../../db/sequelize/model/customer.model';
import OrderModel from '../../db/sequelize/model/order.model';
import OrderItemModel from '../../db/sequelize/model/order-item.model';
import Order from '../../../domain/entity/order';
import Product from '../../../domain/entity/product';
import OrderItem from '../../../domain/entity/order_item';
import ProductModel from '../../db/sequelize/model/product.model';
import ProductRepository from '../product/product.repository';
import OrderRepository from './order.repository';
import CustomerRepository from '../customer/customer.repository';

describe('OrderRepository integration tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ]);

    await sequelize.sync();
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it('should persist an order with its items', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('customer-test-1', 'Test Customer');
    customer.address = new Address('rua-test', 1, '123456', 'cidade-test', 'estado-test');
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('product-test-1', 'Product Test', 60);
    await productRepository.create(product);

    const item = new OrderItem('item-test-1', product.id, product.name, product.price, 2);
    const order = new Order('order-test-1', customer.id, [item]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const dbOrder = await OrderModel.findOne({ where: { id: 'order-test-1' }, include: ['items'] });

    expect(dbOrder.toJSON()).toStrictEqual({
      id: 'order-test-1',
      customer_id: customer.id,
      total: 120,
      items: [
        {
          id: item.id,
          product_id: product.id,
          name: product.name,
          price: product.price,
          quantity: 2,
          order_id: 'order-test-1',
        },
      ],
    });
  });

  it('should retrieve order by Id'), async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('customer-test-1', 'John Doe');
    customer.address = new Address('Main St', 10, '11111', 'City A', 'ST');
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('product-test-1', 'Product Test', 10);
    await productRepository.create(product);

    const item = new OrderItem('item-test-1', product.id, product.name, product.price, 2);
    const order = new Order('order-test-1', customer.id, [item]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const result = await orderRepository.find(order.id);

    expect(result instanceof Order).toBe(true);
    expect(result.id).toBe(order.id);
    expect(result.customerId).toBe(customer.id);
    expect(result.items.length).toBe(1);
    expect(result.items[0]).toEqual(item);
  });

  it('should throw an error if order does not exist', async () => {
    const orderRepository = new OrderRepository();
    await expect(orderRepository.find('no-id')).rejects.toThrow('Order not found');
  });

  it('should update an existing order with new items', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('customer-test-1', 'John Doe');
    customer.address = new Address('rua-test', 1, '123456', 'cidade-test', 'estado-test');
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const productA = new Product('product-test-1', 'Product Test A', 100);
    await productRepository.create(productA);

    const itemA = new OrderItem('item-test-1', productA.id, productA.name, productA.price, 5);
    const order = new Order('order-test-1', customer.id, [itemA]);

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const productB = new Product('product-test-2', 'Product Test B', 50);
    await productRepository.create(productB);

    const itemB = new OrderItem('item-2', productB.id, productB.name, productB.price, 3);
    order.addItem(itemB);

    await orderRepository.update(order);

    const updatedOrder = await orderRepository.find(order.id);
    expect(updatedOrder.items.length).toBe(2);
    expect(updatedOrder.total()).toBe(650);
  });

  it('should list all orders', async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer('customer-test-1', 'John Doe');
    customer.address = new Address('rua-test', 1, '123456', 'cidade-test', 'estado-test');
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product('product-test-1', 'Product Test', 10);
    await productRepository.create(product);

    const orderRepository = new OrderRepository();

    const order1 = new Order('order-test-1', customer.id, [
      new OrderItem('item-test-1', product.id, product.name, product.price, 2),
    ]);
    const order2 = new Order('order-2', customer.id, [
      new OrderItem('item-2', product.id, product.name, product.price, 2),
    ]);
    const order3 = new Order('order-3', customer.id, [
      new OrderItem('item-3', product.id, product.name, product.price, 2),
    ]);

    await orderRepository.create(order1);
    await orderRepository.create(order2);
    await orderRepository.create(order3);

    const orders = await orderRepository.findAll();

    expect(orders).toHaveLength(3);
    expect(orders[0]).toEqual(order1);
    expect(orders[1]).toEqual(order2);
    expect(orders[2]).toEqual(order3);
  });
});
