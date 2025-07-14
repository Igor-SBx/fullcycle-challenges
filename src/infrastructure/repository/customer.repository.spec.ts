import { Sequelize } from "sequelize-typescript";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer Repository Integration Tests", () => {

    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([CustomerModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should persist a new customer", async () => {
        const customerRepo = new CustomerRepository();
        const customer = new Customer("100", "Alice Johnson");
        const address = new Address("Oak Avenue", 101, "98765", "Rivertown");
        customer.changeAddress(address);

        await customerRepo.create(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "100" } });

        expect(customerModel).not.toBeNull();
        expect(customerModel!.toJSON()).toEqual({
            id: customer.getId(),
            name: customer.getName(),
            street: customer.getAddress().street,
            number: customer.getAddress().number,
            zipcode: customer.getAddress().zip,
            city: customer.getAddress().city,
            active: true,
            rewardPoints: 0,
        });
    });

    it("should update existing customer details", async () => {
        const customerRepo = new CustomerRepository();
        const customer = new Customer("101", "Bob Smith");
        const address = new Address("Pine Street", 202, "56789", "Laketown");
        customer.changeAddress(address);

        await customerRepo.create(customer);

        customer.changeName("Robert Smith");
        customer.deactivate();
        customer.addRewardPoints(150);

        await customerRepo.update(customer);

        const customerModel = await CustomerModel.findOne({ where: { id: "101" } });

        expect(customerModel).not.toBeNull();
        expect(customerModel!.toJSON()).toEqual({
            id: customer.getId(),
            name: customer.getName(),
            street: customer.getAddress().street,
            number: customer.getAddress().number,
            zipcode: customer.getAddress().zip,
            city: customer.getAddress().city,
            active: false,
            rewardPoints: 150,
        });
    });

    it("should retrieve a customer by ID", async () => {
        const customerRepo = new CustomerRepository();
        const customer = new Customer("102", "Carol White");
        const address = new Address("Maple Lane", 303, "34567", "Hillview");
        customer.changeAddress(address);

        await customerRepo.create(customer);

        const foundCustomer = await customerRepo.find("102");

        expect(foundCustomer.getId()).toBe(customer.getId());
        expect(foundCustomer.getName()).toBe(customer.getName());
        expect(foundCustomer.getAddress().street).toBe(customer.getAddress().street);
        expect(foundCustomer.getAddress().number).toBe(customer.getAddress().number);
        expect(foundCustomer.getAddress().zip).toBe(customer.getAddress().zip);
        expect(foundCustomer.getAddress().city).toBe(customer.getAddress().city);
        expect(foundCustomer.isActive()).toBe(true);
        expect(foundCustomer.getRewardPoints()).toBe(0);
    });

    it("should throw an error when customer ID does not exist", async () => {
        const customerRepo = new CustomerRepository();
        await expect(customerRepo.find("999")).rejects.toThrow("Customer not found");
    });

    it("should list all customers", async () => {
        const customerRepo = new CustomerRepository();

        const customerA = new Customer("103", "David Green");
        const addressA = new Address("Cedar Road", 404, "12321", "Brookfield");
        customerA.changeAddress(addressA);
        await customerRepo.create(customerA);

        const customerB = new Customer("104", "Eva Brown");
        const addressB = new Address("Birch Street", 505, "45654", "Brookfield");
        customerB.changeAddress(addressB);
        await customerRepo.create(customerB);

        const customers = await customerRepo.findAll();

        expect(customers.length).toBe(2);

        const foundA = customers.find(cust => cust.getId() === customerA.getId())!;
        expect(foundA).toBeDefined();
        expect(foundA.getName()).toBe(customerA.getName());
        expect(foundA.getAddress().street).toBe(customerA.getAddress().street);
        expect(foundA.getAddress().number).toBe(customerA.getAddress().number);
        expect(foundA.getAddress().zip).toBe(customerA.getAddress().zip);
        expect(foundA.getAddress().city).toBe(customerA.getAddress().city);
        expect(foundA.isActive()).toBe(true);
        expect(foundA.getRewardPoints()).toBe(0);

        const foundB = customers.find(cust => cust.getId() === customerB.getId())!;
        expect(foundB).toBeDefined();
        expect(foundB.getName()).toBe(customerB.getName());
        expect(foundB.getAddress().street).toBe(customerB.getAddress().street);
        expect(foundB.getAddress().number).toBe(customerB.getAddress().number);
        expect(foundB.getAddress().zip).toBe(customerB.getAddress().zip);
        expect(foundB.getAddress().city).toBe(customerB.getAddress().city);
        expect(foundB.isActive()).toBe(true);
        expect(foundB.getRewardPoints()).toBe(0);
    });
});
