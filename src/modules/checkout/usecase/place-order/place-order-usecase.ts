import Id from "../../../@shared/domain/value-object/id.value-object"
import UseCaseInterface from "../../../@shared/usecase/use-case.interface"
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface"
import InvoiceFacadeInterface from "../../../invoice/facade/invoice-facade-interface"
import PaymentFacadeInterface from "../../../payment/facade/facade.interface"
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface"
import StoreCatalogFacadeInterface from "../../../store-catalog/facade/store-catalog.facade.interface"
import Address from "../../domain/address-value-object"
import Client from "../../domain/client.entity"
import Order from "../../domain/order-entity"
import Product from "../../domain/product-entity"
import CheckoutGateway from "../../gateway/checkout-gateway"
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order-dto"

type PlaceOrderUseCaseProps = {
    clientFacade: ClientAdmFacadeInterface
    productFacade: ProductAdmFacadeInterface
    catalogFacade: StoreCatalogFacadeInterface
    paymentFacade: PaymentFacadeInterface
    invoiceFacade: InvoiceFacadeInterface
    checkoutRepository: CheckoutGateway
}

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface
    private _productFacade: ProductAdmFacadeInterface
    private _catalogFacade: StoreCatalogFacadeInterface
    private _paymentFacade: PaymentFacadeInterface
    private _invoiceFacade: InvoiceFacadeInterface
    private _checkoutRepository: CheckoutGateway

    constructor(props: PlaceOrderUseCaseProps) {
        this._clientFacade = props.clientFacade
        this._productFacade = props.productFacade
        this._catalogFacade = props.catalogFacade
        this._paymentFacade = props.paymentFacade
        this._invoiceFacade = props.invoiceFacade
        this._checkoutRepository = props.checkoutRepository
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientFacade.find({ id: input.clientId })
        if (!client) {
            throw new Error('Client not found')
        }

        await this.validateProducts(input)

        const products = await Promise.all(
            input.products.map((p) => this.getProduct(p.productId))
        )

        const myClient = new Client({
            id: new Id(client.id),
            name: client.name,
            document: client.document,
            email: client.email,
            address: new Address({
                street: client.address.street,
                number: client.address.number,
                zipCode: client.address.zipCode,
                state: client.address.state,
                complement: client.address.complement,
                city: client.address.city,
            }),
        })

        const order = new Order({
            client: myClient,
            products: products,
        })

        const payment = await this._paymentFacade.process({
            orderId: order.id.id,
            amount: order.total,
        })

        const invoice =
            payment.status === 'approved'
                ? await this._invoiceFacade.generate({
                    name: client.name,
                    document: client.document,
                    street: client.address.street,
                    complement: client.address.complement,
                    city: client.address.city,
                    number: client.address.number,
                    state: client.address.state,
                    zipCode: client.address.zipCode,
                    items: products.map((p) => ({
                        id: p.id.id,
                        name: p.name,
                        price: p.salesPrice,
                    })),
                })
                : null

        payment.status === 'approved' && order.approved()
        await this._checkoutRepository.addOrder(order)

        return {
            id: order.id.id,
            invoiceId: payment.status === 'approved' ? invoice.id : null,
            status: order.status,
            total: order.total,
            products: order.products.map((p) => ({
                productId: p.id.id,
            })),
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (input.products.length === 0) {
            throw new Error('No products selected')
        }

        for (const p of input.products) {
            const product = await this._productFacade.checkStock({
                productId: p.productId,
            })

            if (product.stock <= 0) {
                throw new Error(
                    `Product ${product.productId} is not available in stock`
                )
            }
        }
    }

    private async getProduct(productId: string): Promise<Product> {
        const product = await this._catalogFacade.find({ id: productId })
        if (!product) {
            throw new Error('Product not found')
        }
        const productProps = {
            id: new Id(product.id),
            name: product.name,
            description: product.description,
            salesPrice: product.salesPrice,
        }
        return new Product(productProps)
    }
}