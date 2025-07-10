import Address from './address';
import Customer from './customer';

describe('Customer entity tests', () => {
  it('should throw an error if the id is missing', () => {
    expect(() => new Customer('', 'Test test')).toThrow("id cannot be empty");
  });

  it('should throw an error if the name is empty', () => {
    expect(() => new Customer('1', '')).toThrow("name cannot be empty");
  });

  it('should allow updating the customer name', () => {
    const customer = new Customer('1', 'Test test');
    customer.changeName('Jane Doe');
    expect(customer.name).toBe('Jane Doe');
  });

  it('should activate a customer with a valid address', () => {
    const customer = new Customer('1', 'Test test');
    const address = new Address('test-street', 123, '123456', 'test-city', 'test-state');
    customer.address = address;
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it('should deactivate an active customer', () => {
    const customer = new Customer('1', 'Test test');
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it('should throw an error when activating a customer without an address', () => {
    const customer = new Customer('1', 'Test test');
    expect(() => customer.activate()).toThrow("address is mandatory to activate customer");
  });

  it('should correctly accumulate reward points', () => {
    const customer = new Customer('1', 'Test test');
    expect(customer.rewardPoints).toBe(0);
    customer.addRewardPoints(50);
    expect(customer.rewardPoints).toBe(50);
  });
});
