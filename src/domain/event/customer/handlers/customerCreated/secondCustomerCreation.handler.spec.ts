import CustomerCreatedEvent from "../../event/customerCreated/customerCreated.event";
import EnviaConsoleLog2Handler from "./secondCustomerCreation.handler";

describe('secondCustomerCreation', () => {
  it('should output "ssse é o segundo console.log do evento: CustomerCreated" through console ', () => {
    const spy = jest.spyOn(console, 'log');

    const event = new CustomerCreatedEvent({
      id: 'test',
      name: 'test',
      email: 'test',
      rewardPoints: 0,
      active: false,
    });

    const handler = new EnviaConsoleLog2Handler();
    handler.handle(event);

    expect(spy).toHaveBeenCalledWith('esse é o segundo console.log do evento: CustomerCreated');
  });
})