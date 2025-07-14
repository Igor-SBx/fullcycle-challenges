import Customer from "./customer";
import Address from "./address";

describe("Customer Unit Tests", () => {

    it("should throw an error if customer ID is missing", () => {
        expect(() => new Customer("", "Alice")).toThrow("Customer ID must be provided.");
    });

    it("should throw an error if customer name is missing", () => {
        expect(() => new Customer("abc123", "")).toThrow("Customer name must be provided.");
    });

    it("should update the customer name successfully", () => {
        const customer = new Customer("cust01", "Alice");
        customer.changeName("Smith");
        expect(customer.getName()).toBe("Smith");
    });

    it("should activate the customer when a valid address is provided", () => {
        const customer = new Customer("cust02", "Bob");
        const address = new Address("Elm Street", 42, "67890", "Gotham");
        customer.changeAddress(address);
        customer.activate();
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivate the customer when requested", () => {
        const customer = new Customer("cust03", "Charlie");
        customer.deactivate();
        expect(customer.isActive()).toBe(false);
    });

    it("should throw an error when trying to activate a customer without an address", () => {
        const customer = new Customer("cust04", "Diana");
        expect(() => customer.activate()).toThrow("Customer must have an address to be activated.");
    });

    it("should correctly accumulate reward points over time", () => {
        const customer = new Customer("cust05", "Eve");
        expect(customer.getRewardPoints()).toBe(0);

        customer.addRewardPoints(50);
        expect(customer.getRewardPoints()).toBe(50);

        customer.addRewardPoints(75);
        expect(customer.getRewardPoints()).toBe(125);
    });
});
