import EventHandlerInterface from "../../../@shared/event-handler.interface";
import AddressChangedEvent from "../../event/addressChanged/customer-address-changed.event";


export default class EnviaConsoleLogHandler implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        const { id, name, address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address.zip}, rua ${address.street}, nº${address.number}, ${address.city}/${address.state}`);
    }
}