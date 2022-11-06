import invoiceEntity from "../domain/invoice-entity"
import InvoiceFactory from "../factory/invoice-factory"
import InvoiceGateway from "../gateway/invoice-gateway"
import InvoiceModel from "./model/invoice-model"
import InvoiceProductModel from "./model/invoice-product-model"

export default class InvoiceRepository implements InvoiceGateway {
    async generate(invoice: invoiceEntity): Promise<void> {
        await InvoiceModel.create(
            {
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
                createdAt: invoice.createdAt || new Date(),
                updatedAt: invoice.updatedAt || new Date(),
            },
            {
                include: [{ model: InvoiceProductModel }],
            }
        )
    }

    async find(id: string): Promise<invoiceEntity> {
        let invoiceModel
        try {
            invoiceModel = await InvoiceModel.findOne({
                where: {
                    id,
                },
                rejectOnEmpty: true,
                include: ['items'],
            })
        } catch (error) {
            throw new Error('Invoice not found')
        }

        const invoiceFactoryProps = {
            id: invoiceModel.id,
            name: invoiceModel.name,
            document: invoiceModel.document,
            street: invoiceModel.street,
            number: invoiceModel.number,
            complement: invoiceModel.complement,
            city: invoiceModel.city,
            state: invoiceModel.state,
            zipCode: invoiceModel.zipCode,
            items: invoiceModel.items,
        }

        const invoice = InvoiceFactory.createInvoiceFactory(invoiceFactoryProps)

        return invoice
    }
}