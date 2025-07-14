import { Sequelize } from "sequelize-typescript";
import OrderModel from "../db/sequelize/model/order.model";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order_item.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import Customer from "../../domain/entity/customer";
import Address from "../../domain/entity/address";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import Order from "../../domain/entity/order";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order Repository test", () => {
    
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        sequelize.addModels([OrderModel, CustomerModel, OrderItemModel, ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should create a new order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Cliente1", "John Doe");
        customer.changeAddress(new Address("Main Street", 100, "12345", "Springfield"));
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("P1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "OI1", 
            product.getId(),
            product.getName(), 
            product.getPrice(), 
            2
        );
        
        const order = new Order("O1", customer.getId(), [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne(
            { where: { id: "O1" }, include: "items" }
        );

        expect(orderModel).not.toBeNull();
        expect(orderModel!.toJSON()).toEqual({
            id: order.getId(),
            customer_id: customer.getId(),
            total: order.getTotal(),
            items: [
                {
                    id: orderItem.getId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                    order_id: order.getId(),
                    product_id: product.getId(),
                },
            ],
       });
    });

    it("should update an order by changing the customer", async () => {
        const customerRepository = new CustomerRepository();
        const customer1 = new Customer("Cliente1", "John Doe");
        customer1.changeAddress(new Address("Main Street", 100, "12345", "Springfield"));

        const customer2 = new Customer("Cliente2", "Jane Doe");
        customer2.changeAddress(new Address("Second Street", 200, "54321", "Springfield"));

        await customerRepository.create(customer1);
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product = new Product("P1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "OI1", 
            product.getId(),
            product.getName(), 
            product.getPrice(), 
            2
        );

        const order = new Order("O1", customer1.getId(), [orderItem]);
        const orderRepository = new OrderRepository();

        await orderRepository.create(order);

        order.changeCustomer(customer2.getId());
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne(
            { where: { id: "O1" }, include: "items" }
        );

        expect(orderModel).not.toBeNull();
        expect(orderModel!.toJSON()).toEqual({
            id: order.getId(),
            customer_id: customer2.getId(),
            total: order.getTotal(),
            items: [
                {
                    id: orderItem.getId(),
                    name: orderItem.getName(),
                    price: orderItem.getPrice(),
                    quantity: orderItem.getQuantity(),
                    order_id: order.getId(),
                    product_id: product.getId(),
                },
            ],
        });
    });

    it("should find an order", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Cliente1", "John Doe");
        customer.changeAddress(new Address("Main Street", 100, "12345", "Springfield"));
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("P1", "Product 1", 10);
        await productRepository.create(product);

        const orderItem = new OrderItem(
            "OI1", 
            product.getId(),
            product.getName(), 
            product.getPrice(), 
            2
        );

        const order = new Order("O1", customer.getId(), [orderItem]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const foundOrder = await orderRepository.find(order.getId());

        expect(foundOrder).toEqual(order);
    });

    it("should throw error when order not found", async () => {
        const orderRepository = new OrderRepository();
        await expect(orderRepository.find("O1")).rejects.toThrow("Order not found");
    });

    it("should find all orders", async () => {
        const customerRepository = new CustomerRepository();

        const customer1 = new Customer("Cliente1", "John Doe");
        customer1.changeAddress(new Address("Main Street", 100, "12345", "Springfield"));
        await customerRepository.create(customer1);

        const customer2 = new Customer("Cliente2", "Jane Doe");
        customer2.changeAddress(new Address("Second Street", 200, "54321", "Springfield"));
        await customerRepository.create(customer2);

        const productRepository = new ProductRepository();
        const product1 = new Product("P1", "Product 1", 10);
        await productRepository.create(product1);

        const product2 = new Product("P2", "Product 2", 20);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "OI1", 
            product1.getId(),
            product1.getName(), 
            product1.getPrice(), 
            2
        );
        
        const orderItem2 = new OrderItem(
            "OI2", 
            product2.getId(),
            product2.getName(), 
            product2.getPrice(), 
            3
        );
        
        const order1 = new Order("O1", customer1.getId(), [orderItem1]);
        const order2 = new Order("O2", customer2.getId(), [orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);

        const orders = await orderRepository.findAll();

        expect(orders.length).toBe(2);
        expect(orders[0]).toEqual(order1);
        expect(orders[1]).toEqual(order2);
    });

    it("should throw an error when no orders are found", async () => {
        const orderRepository = new OrderRepository();
        await expect(orderRepository.findAll()).rejects.toThrow("No orders found");
    });

    it("should update an order by adding a new OrderItem", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Cliente1", "John Doe");
        customer.changeAddress(new Address("Main Street", 100, "12345", "Springfield"));
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("P1", "Product 1", 10);
        await productRepository.create(product1);

        const orderItem1 = new OrderItem(
            "OI1", 
            product1.getId(),
            product1.getName(), 
            product1.getPrice(), 
            2
        );

        const order = new Order("O1", customer.getId(), [orderItem1]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const product2 = new Product("P2", "Product 2", 20);
        await productRepository.create(product2);
        
        const orderItem2 = new OrderItem(
            "OI2", 
            product2.getId(),
            product2.getName(), 
            product2.getPrice(), 
            3
        );

        order.addItem(orderItem2);
        await orderRepository.update(order);
        
        const orderModel = await OrderModel.findOne(
            { where: { id: "O1" }, include: "items" }
        );

        expect(orderModel).not.toBeNull();
        expect(orderModel!.toJSON()).toEqual({
            id: order.getId(),
            customer_id: customer.getId(),
            total: order.getTotal(),
            items: [
                {
                    id: orderItem1.getId(),
                    name: orderItem1.getName(),
                    price: orderItem1.getPrice(),
                    quantity: orderItem1.getQuantity(),
                    order_id: order.getId(),
                    product_id: product1.getId(),
                },
                {
                    id: orderItem2.getId(),
                    name: orderItem2.getName(),
                    price: orderItem2.getPrice(),
                    quantity: orderItem2.getQuantity(),
                    order_id: order.getId(),
                    product_id: product2.getId(),
                },
            ],
        });
    });

    it("should update an order by removing an OrderItem", async () => {
        const customerRepository = new CustomerRepository();
        const customer = new Customer("Cliente1", "John Doe");
        customer.changeAddress(new Address("Main Street", 100, "12345", "Springfield"));
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product1 = new Product("P1", "Product 1", 10);
        await productRepository.create(product1);
        
        const product2 = new Product("P2", "Product 2", 20);
        await productRepository.create(product2);

        const orderItem1 = new OrderItem(
            "OI1", 
            product1.getId(),
            product1.getName(), 
            product1.getPrice(), 
            2
        );
        
        const orderItem2 = new OrderItem(
            "OI2", 
            product2.getId(),
            product2.getName(), 
            product2.getPrice(), 
            3
        );

        const order = new Order("O1", customer.getId(), [orderItem1, orderItem2]);
        const orderRepository = new OrderRepository();
        await orderRepository.create(order);
        
        order.removeItem(orderItem1.getId());
        await orderRepository.update(order);

        const orderModel = await OrderModel.findOne(
            { where: { id: "O1" }, include: "items" }
        );

        expect(orderModel).not.toBeNull();

        expect(orderModel!.toJSON()).toEqual({
            id: order.getId(),
            customer_id: customer.getId(),
            total: order.getTotal(),
            items: [
                {
                    id: orderItem2.getId(),
                    name: orderItem2.getName(),
                    price: orderItem2.getPrice(),
                    quantity: orderItem2.getQuantity(),
                    order_id: order.getId(),
                    product_id: product2.getId(),
                },
            ],
        });
    });

});
