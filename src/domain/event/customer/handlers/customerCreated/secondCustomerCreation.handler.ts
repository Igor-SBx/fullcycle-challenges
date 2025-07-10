import EventHandlerInterface from "../../../@shared/event-handler.interface";
import CustomerCreatedEvent from "../../event/customerCreated/customerCreated.event";

export default class EnviaConsoleLog2Handler implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(event: CustomerCreatedEvent): void {
        console.log("esse é o segundo console.log do evento: CustomerCreated");
    }
}