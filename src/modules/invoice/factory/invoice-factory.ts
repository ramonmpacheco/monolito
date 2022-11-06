import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "../domain/address-value-object"
import Invoice from "../domain/invoice-entity"
import Product from "../domain/product-entity"
import InvoiceFacade from "../facade/invoice-facade"
import InvoiceFacadeInterface from "../facade/invoice-facade-interface"
import InvoiceGateway from "../gateway/invoice-gateway"
import InvoiceRepository from "../repository/invoice-repository"
import FindInvoiceUseCase from "../usecase/find/find-invoice-usecase"
import GenerateInvoiceUseCase from "../usecase/generate/generate-invoice-usecase"

type invoiceFactoryProps = {
    id?: string
    name: string
    document: string
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
    items: {
        id: string
        name: string
        price: number
    }[]
}

export default class InvoiceFactory {
    static createInvoiceFactory(input: invoiceFactoryProps): Invoice {
        const addressProps = {
            street: input.street,
            number: input.number,
            complement: input.complement,
            city: input.city,
            state: input.state,
            zipCode: input.zipCode,
        }
        const address = new Address(addressProps)

        let products: Product[] = []
        for (const item of input.items) {
            const productProps = {
                id: new Id(item.id),
                name: item.name,
                price: item.price,
            }
            const product = new Product(productProps)
            products.push(product)
        }

        const invoiceProps = {
            id: new Id(input.id),
            name: input.name,
            document: input.document,
            address: address,
            items: products,
        }
        const invoice = new Invoice(invoiceProps)

        return invoice
    }

    static createInvoiceRepositoryFactory(): InvoiceGateway {
        return new InvoiceRepository()
    }

    static createInvoiceUseCaseFactory(): GenerateInvoiceUseCase {
        const invoiceRepository = InvoiceFactory.createInvoiceRepositoryFactory()
        return new GenerateInvoiceUseCase(invoiceRepository)
    }

    static creatInvoiceFacadeFactory(): InvoiceFacadeInterface {
        const repository = InvoiceFactory.createInvoiceRepositoryFactory()
        const findUseCase = new FindInvoiceUseCase(repository)
        const generateUseCase = new GenerateInvoiceUseCase(repository)
        const invoiceFacade = new InvoiceFacade({ findUseCase, generateUseCase })

        return invoiceFacade
    }
}