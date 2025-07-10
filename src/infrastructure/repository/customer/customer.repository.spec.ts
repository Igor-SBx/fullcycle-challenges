import { Sequelize } from 'sequelize-typescript';
import CustomerModel from '../../db/sequelize/model/customer.model';
import CustomerRepository from './customer.repository';
import Address from '../../../domain/entity/address';
import Customer from '../../../domain/entity/customer';


describe('CustomerRepository integration tests', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([CustomerModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it('should create a new customer in the database', async () => {
    const repository = new CustomerRepository();
    const customer = new Customer('test-customer-1', 'Test test');
    const address = new Address('rua-test', 1, '123456', 'cidade-test', 'estado-test');
    customer.changeAddress(address);

    await repository.create(customer);

    const dbCustomer = await CustomerModel.findOne({ where: { id: 'test-customer-1' } });

    expect(dbCustomer.toJSON()).toStrictEqual({
      id: 'test-customer-1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      state: address.state,
    });
  });

  it('should update an existing customer', async () => {
    const repository = new CustomerRepository();
    const customer = new Customer('test-customer-1', 'Test test');
    const address = new Address('rua-test', 1, '123456', 'cidade-test', 'estado-test');
    customer.address = address;

    await repository.create(customer);

    customer.changeName('Jane Doe');
    await repository.update(customer);

    const dbCustomer = await CustomerModel.findOne({ where: { id: 'test-customer-1' } });

    expect(dbCustomer.toJSON()).toStrictEqual({
      id: 'test-customer-1',
      name: customer.name,
      active: customer.isActive(),
      rewardPoints: customer.rewardPoints,
      street: address.street,
      number: address.number,
      zipcode: address.zip,
      city: address.city,
      state: address.state,
    });
  });

  it('should find a customer by ID', async () => {
    const repository = new CustomerRepository();
    const customer = new Customer('test-customer-1', 'Test test');
    const address = new Address('rua-test', 1, '123456', 'cidade-test', 'estado-test');
    customer.address = address;

    await repository.create(customer);

    const result = await repository.find('test-customer-1');

    expect(result).toStrictEqual(customer);
  });

  it('should throw an error if customer is not found', async () => {
    const repository = new CustomerRepository();

    await expect(repository.find('non-existent-id')).rejects.toThrow('Customer not found');
  });

  it('should return all customers', async () => {
    const repository = new CustomerRepository();

    const customer1 = new Customer('test-customer-1', 'Alice');
    const address1 = new Address('rua-test-1', 1, '123456', 'cidade-test-1', 'estado-test-1');
    customer1.address = address1;
    customer1.addRewardPoints(50);
    customer1.activate();

    const customer2 = new Customer('cust-2', 'Bob');
    const address2 = new Address('rua-test-2', 2, '223456', 'cidade-test-2', 'estado-test-2');
    customer2.address = address2;
    customer2.addRewardPoints(70);

    await repository.create(customer1);
    await repository.create(customer2);

    const result = await repository.findAll();

    expect(result).toHaveLength(2);
    expect(result).toContainEqual(customer1);
    expect(result).toContainEqual(customer2);
  });
});
