import ProductCreatedEvent from "../product-created.event";
import SendEmailWhenProductIsCreatedHandler from "./send-email-when-product-is-created.handler";

describe("SendEmailWhenProductIsCreatedHandler", () => {
    it("Should send an email when a product is created", () => {
        const eventHandler = new SendEmailWhenProductIsCreatedHandler();
        const handleSpy = jest.spyOn(eventHandler, "handle");
        const loggerSpy = jest.spyOn(console, "log");

        const productCreatedEvent = new ProductCreatedEvent("any_data");
        
        eventHandler.handle(productCreatedEvent);
        
        expect(handleSpy).toHaveBeenCalledWith(productCreatedEvent);
        expect(loggerSpy).toHaveBeenCalledWith("Sending email with product data...");
    });
})