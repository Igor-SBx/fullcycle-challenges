import Customer from "./domain/entity/customer";
import Address from "./domain/entity/address";

import EventDispatcher from "./domain/event/@shared/event-dispatcher";

import CustomerCreatedEvent from "./domain/event/customer/event/customerCreated/customerCreated.event";
import CustomerAddressChangedEvent from "./domain/event/customer/customer-address-changed.event";

import LogCustomerCreationHandler1 from "./domain/event/customer/handlers/firstCustomerCreation.handler";
import LogCustomerCreationHandler2 from "./domain/event/customer/handlers/secondCustomerCreation.handler";
import LogAddressChangeHandler from "./domain/event/customer/handlers/enviaConsoleLog.handler";

const eventDispatcher = EventDispatcher.create();

eventDispatcher.register("CustomerCreatedEvent", new LogCustomerCreationHandler1());
eventDispatcher.register("CustomerCreatedEvent", new LogCustomerCreationHandler2());
eventDispatcher.register("CustomerAddressChangedEvent", new LogAddressChangeHandler());

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

const addressChangedEvent = new CustomerAddressChangedEvent({
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
