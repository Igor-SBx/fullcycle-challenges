import EventInterface from "../../../@shared/event.interface";

type AddressChangedEventData = {
    id: string;
    name: string;
    address: {
        street: string;
        number: number;
        city: string;
        zip: string;
        state: string;
    };
};

export default class AddressChangedEvent implements EventInterface {
    dateTimeOccurred: Date;
    eventData: AddressChangedEventData;

    constructor(eventData: AddressChangedEventData) {
        this.dateTimeOccurred = new Date();
        this.eventData = eventData;
    }
}