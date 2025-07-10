
import CustomerCreatedEvent from "../../event/customerCreated/customerCreated.event";
import LogCustomerCreationHandler1 from "./firstCustomerCreation.handler";

describe('firstCustomerCreation', () => {
    it('should output "Esse é o primeiro console.log do evento: CustomerCreated" through console ', () => {
        const spy = jest.spyOn(console, 'log');

        const event = new CustomerCreatedEvent({
            id: 'test',
            name: 'test',
            email: 'test',
            rewardPoints: 0,
            active: false,
        });

        const handler = new LogCustomerCreationHandler1();
        handler.handle(event);

        expect(spy).toHaveBeenCalledWith('Esse é o primeiro console.log do evento: CustomerCreated');
    });
});
