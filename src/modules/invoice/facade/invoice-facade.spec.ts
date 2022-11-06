import { Sequelize } from 'sequelize-typescript'
import InvoiceFactory from '../factory/invoice-factory'
import InvoiceModel from '../repository/model/invoice-model'
import InvoiceProductModel from '../repository/model/invoice-product-model'


describe('InvoiceFacade integration tests', () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true },
        })

        sequelize.addModels([InvoiceModel, InvoiceProductModel])
        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should generate an invoice', async () => {
        const invoiceFacade = InvoiceFactory.creatInvoiceFacadeFactory()

        const input = {
            id: 'id',
            name: 'name',
            document: 'document',
            street: 'street',
            number: 'number',
            complement: 'complement',
            city: 'city',
            state: 'state',
            zipCode: 'zipcode',
            items: [
                {
                    id: 'id',
                    name: 'name',
                    price: 100,
                },
                {
                    id: 'id 2',
                    name: 'name 2',
                    price: 200,
                },
            ],
        }

        const totalExpected = 300

        const result = await invoiceFacade.generate(input)

        expect(result.id).toBe(input.id)
        expect(result.name).toBe(input.name)
        expect(result.document).toBe(input.document)
        expect(result.street).toBe(input.street)
        expect(result.number).toBe(input.number)
        expect(result.complement).toBe(input.complement)
        expect(result.city).toBe(input.city)
        expect(result.state).toBe(input.state)
        expect(result.zipCode).toBe(input.zipCode)
        expect(result.items[0]).toStrictEqual(input.items[0])
        expect(result.items[1]).toStrictEqual(input.items[1])
        expect(result.total).toBe(totalExpected)
    })

    it('should find an invoice', async () => {
        const invoiceFacade = InvoiceFactory.creatInvoiceFacadeFactory()

        const props = {
            id: 'id',
            name: 'name',
            document: 'document',
            street: 'street',
            number: 'number',
            complement: 'complement',
            city: 'city',
            state: 'state',
            zipCode: 'zipcode',
            items: [
                {
                    id: 'id',
                    name: 'name',
                    price: 100,
                },
                {
                    id: 'id 2',
                    name: 'name 2',
                    price: 200,
                },
            ],
        }

        const invoice = InvoiceFactory.createInvoiceFactory(props)

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
                createdAt: invoice.createdAt,
                updatedAt: invoice.updatedAt,
            },
            {
                include: [{ model: InvoiceProductModel }],
            }
        )

        const totalExpected = 300

        const result = await invoiceFacade.find({ id: invoice.id.id })

        expect(result.id).toBe(invoice.id.id)
        expect(result.createdAt).toBeDefined()
        expect(result.name).toBe(invoice.name)
        expect(result.document).toBe(invoice.document)
        expect(result.address.street).toBe(invoice.address.street)
        expect(result.address.number).toBe(invoice.address.number)
        expect(result.address.complement).toBe(invoice.address.complement)
        expect(result.address.city).toBe(invoice.address.city)
        expect(result.address.state).toBe(invoice.address.state)
        expect(result.address.zipCode).toBe(invoice.address.zipCode)
        expect(result.items[0].id).toStrictEqual(invoice.items[0].id.id)
        expect(result.items[0].name).toStrictEqual(invoice.items[0].name)
        expect(result.items[0].price).toStrictEqual(invoice.items[0].price)
        expect(result.items[1].id).toStrictEqual(invoice.items[1].id.id)
        expect(result.items[1].name).toStrictEqual(invoice.items[1].name)
        expect(result.items[1].price).toStrictEqual(invoice.items[1].price)
        expect(result.total).toBe(totalExpected)
    })
})