import SendEmailWhenProductIsCreatedHandler from "../product/handler/send-email-when-product-is-created.handler";
import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "./event-dispatcher";

describe("Domain events unit tests", () => {
    it("Should register an event handler", () => {
        const eventDispatcher = EventDispatcher.create();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreated", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreated"].size).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreated"]).toContain(eventHandler)
        
    })
    it("Should unregister an event handler", () => {
        const eventDispatcher =  EventDispatcher.create();
        eventDispatcher.unregisterAll()
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreated", eventHandler);
        eventDispatcher.unregister("ProductCreated", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreated"].size).toBe(0)
        expect(eventDispatcher.getEventHandlers["ProductCreated"]).not.toContain(eventHandler)
    })
    it("Should not register duplicated handlers", () => {
        const eventDispatcher = EventDispatcher.create();
        eventDispatcher.unregisterAll();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();

        eventDispatcher.register("ProductCreated", eventHandler);
        eventDispatcher.register("ProductCreated", eventHandler);

        expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeDefined()
        expect(eventDispatcher.getEventHandlers["ProductCreated"].size).toBe(1)
        expect(eventDispatcher.getEventHandlers["ProductCreated"]).toContain(eventHandler)
    })
    it("Should unregister all handlers", () => {
        const eventDispatcher = EventDispatcher.create();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        
        eventDispatcher.register("ProductCreated", eventHandler);
        eventDispatcher.unregisterAll();
        
        expect(eventDispatcher.getEventHandlers["ProductCreated"]).toBeUndefined()
        expect(eventDispatcher.getEventHandlers).toEqual({})
    })
    
    it("Should notify all handlers", () => {
        const eventDispatcher = EventDispatcher.create();
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const handleSpy = jest.spyOn(eventHandler, "handle");
        
        const productCreatedEvent = new ProductCreatedEvent("any_data");
        
        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        eventDispatcher.notify(productCreatedEvent);

        expect(handleSpy).toHaveBeenCalledWith(productCreatedEvent)

    })

})