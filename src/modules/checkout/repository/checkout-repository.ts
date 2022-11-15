import orderEntity from "../domain/order-entity";
import CheckoutGateway from "../gateway/checkout-gateway";
import { OrderModel } from "./model/order-model";
import { OrderProductModel } from "./model/order-product-model";


export default class CheckoutRepository implements CheckoutGateway {
  async addOrder(order: orderEntity): Promise<void> {
    await OrderModel.create(
      {
        id: order.id.id,
        status: order.status,
        clientId: order.client.id.id,
        products: order.products.map((item) => ({
          id: item.id.id,
          name: item.name,
          description: item.description,
          salesPrice: item.salesPrice,
        })),
        createdAt: order.createdAt || new Date(),
        updatedAt: order.updatedAt || new Date(),
      },
      {
        include: [{ model: OrderProductModel }],
      }
    )
  }
}