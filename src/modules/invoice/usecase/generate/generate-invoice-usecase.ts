import UseCaseInterface from "../../../@shared/usecase/use-case.interface"
import InvoiceFactory from "../../factory/invoice-factory"
import InvoiceGateway from "../../gateway/invoice-gateway"
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from "./generate-invoice-dto"

export default class GenerateInvoiceUseCase implements UseCaseInterface {
    private _repository: InvoiceGateway

    constructor(repository: InvoiceGateway) {
        this._repository = repository
    }

    async execute(
        input: GenerateInvoiceUseCaseInputDto
    ): Promise<GenerateInvoiceUseCaseOutputDto> {
        const invoice = InvoiceFactory.createInvoiceFactory(input)

        await this._repository.generate(invoice)

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items.map((item) => ({
                id: item.id.id,
                name: item.name,
                price: item.price,
            })),
            total: invoice.items.reduce((acc, product) => acc + product.price, 0),
        }
    }
}