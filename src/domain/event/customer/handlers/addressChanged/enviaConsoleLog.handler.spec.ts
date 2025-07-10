import CustomerAddressChangedEvent from "../../event/addressChanged/customer-address-changed.event";
import EnviaConsoleLogHandler from "./enviaConsoleLog.handler";

describe('enviaConsoleLog', () => {
  it('should output the customer address through console', () => {
    const spy = jest.spyOn(console, "log");

    const eventData = {
      id: "test",
      name: "test",
      address: {
        street: "test",
        number: 123,
        city: "test",
        zip: "test",
        state: "test",
      },
    };
    const event = new CustomerAddressChangedEvent(eventData);

    const handler = new EnviaConsoleLogHandler();
    handler.handle(event);

    expect(spy).toHaveBeenCalledWith(
      `Endereço do cliente: ${eventData.id}, ${eventData.name} alterado para: ${eventData.address.street}, ${eventData.address.number}, ${eventData.address.city}, ${eventData.address.zip}, ${eventData.address.state}`
    );
  });
})