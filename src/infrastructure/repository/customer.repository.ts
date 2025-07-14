import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import CustomerModel from "../db/sequelize/model/customer.model";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository-interface";

export default class CustomerRepository implements CustomerRepositoryInterface {

    async create(entity: Customer): Promise<void> {
        await CustomerModel.create({
            id: entity.getId(),
            name: entity.getName(),
            street: entity.getAddress().street,
            number: entity.getAddress().number,
            zipcode: entity.getAddress().zip,
            city: entity.getAddress().city,
            active: entity.isActive(),
            rewardPoints: entity.getRewardPoints(),
        });
    }

    async update(entity: Customer): Promise<void> {
        await CustomerModel.update({
            name: entity.getName(),
            street: entity.getAddress().street,
            number: entity.getAddress().number,
            zipcode: entity.getAddress().zip,
            city: entity.getAddress().city,
            active: entity.isActive(),
            rewardPoints: entity.getRewardPoints(),
        }, {
            where: { id: entity.getId() },
        });
    }

    async find(id: string): Promise<Customer> {
        const customerModel = await CustomerModel.findByPk(id);
        if (!customerModel) {
            throw new Error("Customer not found");
        }

        const customer = new Customer(customerModel.id, customerModel.name);
        customer.changeAddress(
            new Address(
                customerModel.street,
                customerModel.number,
                customerModel.zipcode,
                customerModel.city
            )
        );
        customer.activate();
        customer.addRewardPoints(customerModel.rewardPoints);

        return customer;
    }

    async findAll(): Promise<Customer[]> {
        const customerModels = await CustomerModel.findAll();

        return customerModels.map(model => {
            const customer = new Customer(model.id, model.name);
            customer.changeAddress(
                new Address(
                    model.street,
                    model.number,
                    model.zipcode,
                    model.city
                )
            );
            customer.activate();
            customer.addRewardPoints(model.rewardPoints);

            return customer;
        });
    }
}
