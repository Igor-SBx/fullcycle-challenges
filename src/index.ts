import Customer from "./domain/entity/customer";
import Address from "./domain/entity/address";

import EventDispatcher from "./domain/event/@shared/event-dispatcher";

import CustomerCreatedEvent from "./domain/event/customer/event/customerCreated/customerCreated.event";
import EnviaConsoleLog1Handler from "./domain/event/customer/handlers/customerCreated/firstCustomerCreation.handler";
import EnviaConsoleLog2Handler from "./domain/event/customer/handlers/customerCreated/secondCustomerCreation.handler";
import EnviaConsoleLogHandler from "./domain/event/customer/handlers/addressChanged/enviaConsoleLog.handler";
import AddressChangedEvent from "./domain/event/customer/event/addressChanged/customer-address-changed.event";


const eventDispatcher = EventDispatcher.create();

eventDispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog1Handler());
eventDispatcher.register("CustomerCreatedEvent", new EnviaConsoleLog2Handler());
eventDispatcher.register("CustomerAddressChangedEvent", new EnviaConsoleLogHandler());

const customer = new Customer('any_id', 'any_name');

const customerCreatedEvent = new CustomerCreatedEvent({
  id: customer.id,
  name: customer.name,
  email: 'any_email',
  rewardPoints: 0,
  active: false,
});
eventDispatcher.notify(customerCreatedEvent);

const newAddress = new Address('any_street', 0, 'any_city', 'any_zip', 'any_state');
customer.changeAddress(newAddress);

const addressChangedEvent = new AddressChangedEvent({
  id: customer.id,
  name: customer.name,
  address: {
    street: newAddress.street,
    number: newAddress.number,
    city: newAddress.city,
    zip: newAddress.zip,
    state: newAddress.state,
  },
});
eventDispatcher.notify(addressChangedEvent);
