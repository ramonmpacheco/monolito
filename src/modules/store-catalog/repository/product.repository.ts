import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import StoreProductModel from "./store-product.model";

export default class ProductRepository implements ProductGateway {
    async findAll(): Promise<Product[]> {
        const products = await StoreProductModel.findAll();

        return products.map(
            (product) =>
                new Product({
                    id: new Id(product.id),
                    name: product.name,
                    description: product.description,
                    salesPrice: product.salesPrice,
                })
        );
    }
    async find(id: string): Promise<Product> {
        const product = await StoreProductModel.findOne({
            where: {
                id: id,
            },
        });

        return new Product({
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        });
    }
    async add(product: Product): Promise<void> {
        await StoreProductModel.create({
          id: product.id.id,
          name: product.name,
          description: product.description,
          salesPrice: product.salesPrice,
          createdAt: product.createdAt,
          updatedAt: product.updatedAt,
        })
      }
}