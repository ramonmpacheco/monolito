import Id from "../../../@shared/domain/value-object/id.value-object"
import UseCaseInterface from "../../../@shared/usecase/use-case.interface"

import Product from "../../domain/product.entity"
import ProductGateway from "../../gateway/product.gateway"
import { AddProductInputDto, AddProductOutputDto } from "./add-product-dto"


export default class AddProductUsecase implements UseCaseInterface {
  constructor(private productRepository: ProductGateway) {}

  async execute(input: AddProductInputDto): Promise<AddProductOutputDto> {
    const product = new Product({
      id: new Id(input.id),
      name: input.name,
      description: input.description,
      salesPrice: input.salesPrice,
    })
    await this.productRepository.add(product)

    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
  }
}