import Order from "../../domain/entity/order";
import OrderModel from "../db/sequelize/model/order.model";
import OrderRepositoryInterface from "../../domain/repository/order-repository-interface";
import OrderItemModel from "../db/sequelize/model/order_item.model";
import OrderItem from "../../domain/entity/order_item";

export default class OrderRepository implements OrderRepositoryInterface {
    async create(entity: Order): Promise<void> {
        await OrderModel.create({
            id: entity.getId(),
            customer_id: entity.getCustomerId(),
            total: entity.getTotal(),
            items: entity.getItems().map((item) => ({
                id: item.getId(),
                name: item.getName(),
                price: item.getPrice(),
                product_id: item.getProductId(),
                quantity: item.getQuantity(),
            })),
        }, {
            include: [{ model: OrderItemModel, as: 'items' }],
        });
    }

    async update(entity: Order): Promise<void> {
        const transaction = await OrderModel.sequelize.transaction();

        try {
            await OrderModel.update({
                customer_id: entity.getCustomerId(),
                total: entity.getTotal(),
            }, {
                where: { id: entity.getId() },
                transaction,
            });

            const existingItems = await OrderItemModel.findAll({
                where: { order_id: entity.getId() },
                transaction,
            });

            const itemsToDelete = existingItems.filter(
                (dbItem) => !entity.getItems().some((item) => item.getId() === dbItem.id)
            );

            for (const item of itemsToDelete) {
                await OrderItemModel.destroy({
                    where: { id: item.id },
                    transaction,
                });
            }

            for (const item of entity.getItems()) {
                await OrderItemModel.upsert({
                    id: item.getId(),
                    name: item.getName(),
                    price: item.getPrice(),
                    product_id: item.getProductId(),
                    quantity: item.getQuantity(),
                    order_id: entity.getId(),
                }, { transaction });
            }

            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
            console.error("Error updating order:", error);
            throw new Error("Failed to update order");
        }
    }

    async find(id: string): Promise<Order> {
        const orderModel = await OrderModel.findByPk(id, {
            include: [{ model: OrderItemModel, as: 'items' }],
        });

        if (!orderModel) {
            throw new Error("Order not found");
        }

        return new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map((item) => new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
            ))
        );
    }

    async findAll(): Promise<Order[]> {
        const orderModels = await OrderModel.findAll({
            include: [{ model: OrderItemModel, as: 'items' }],
        });

        if (orderModels.length === 0) {
            throw new Error("No orders found");
        }

        return orderModels.map((orderModel) => new Order(
            orderModel.id,
            orderModel.customer_id,
            orderModel.items.map((item) => new OrderItem(
                item.id,
                item.product_id,
                item.name,
                item.price,
                item.quantity
            ))
        ));
    }
}
