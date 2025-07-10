
import CustomerCreatedEvent from "../../event/customerCreated/customerCreated.event";
import EnviaConsoleLog1Handler from "./firstCustomerCreation.handler";

describe('firstCustomerCreation', () => {
    it('should output "esse é o primeiro console.log do evento: CustomerCreated" through console ', () => {
        const spy = jest.spyOn(console, 'log');

        const event = new CustomerCreatedEvent({
            id: 'test',
            name: 'test',
            email: 'test',
            rewardPoints: 0,
            active: false,
        });

        const handler = new EnviaConsoleLog1Handler();
        handler.handle(event);

        expect(spy).toHaveBeenCalledWith('esse é o primeiro console.log do evento: CustomerCreated');
    });
});
