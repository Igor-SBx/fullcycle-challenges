import Order from '../../domain/entity/order';
import OrderItem from '../../domain/entity/order_item';
import OrderItemModel from '../db/sequelize/model/order-item.model';
import OrderModel from '../db/sequelize/model/order.model';
import OrderRepositoryInterface from '../../domain/repository/order.repository.interface';

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {

    await OrderModel.create({
      id: entity.id,
      customer_id: entity.customerId,
      total: entity.total,
      items: entity.items.map(item => ({
        id: item.id,
        order_id: entity.id,
        product_id: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    }, {
      include: [{ model: OrderItemModel, as: 'items' }]
    })

  }

  async find(id: string): Promise<Order> {
    const orderModel = await OrderModel.findOne({ where: { id }, include: ["items"] })
    if (!orderModel) throw new Error("Order not found!")
    const orderItems = orderModel.items.map((item: OrderItem) => new OrderItem(
      item.id,
      item.productId,
      item.name,
      item.price,
      item.quantity
    ))
    const order = new Order(orderModel.id, orderModel.customer_id, orderItems)
    return order;
  }

  async update(entity: Order): Promise<void> {
    const order = await OrderModel.findOne({ where: { id: entity.id } })
    if (!order) throw new Error("Order not found!")

    const sequelize = order.sequelize;

    const transaction = await sequelize.transaction()
    try {
      await OrderItemModel.destroy({ where: { order_id: entity.id }, transaction })
      const items = entity.items.map((item) => ({
        id: item.id,
        product_id: item.productId,
        price: item.price,
        order_id: order.id,
        quantity: item.quantity,
        name: item.name
      }))
      await OrderItemModel.bulkCreate(items, { transaction })
      await order.update({
        total: entity.total()
      })
      await transaction.commit()
    } catch (error) {
      transaction.rollback()
    }
  }

  async findAll(): Promise<Order[]> {
    const orderModels = await OrderModel.findAll({ include: ["items"] });
    const orders = []

    for (const orderModel of orderModels) {
      const items = orderModel.items.map((item) => new OrderItem(item.id, item.product_id, item.name, item.price, item.quantity))
      const order = new Order(orderModel.id, orderModel.customer_id, items)
      orders.push(order)
    }
    return orders;
  }

}