import { app, sequelize } from '../express'
import request from 'supertest'

describe('Invoice E2E tests', () => {
    beforeEach(async () => {
        await sequelize.sync({ force: true })
    })

    afterAll(async () => {
        await sequelize.close()
    })

    it('should create an invoice', async () => {
        const invoiceProps = {
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

        const response = await request(app).post('/invoices').send(invoiceProps)

        expect(response.body.id).toBeDefined()
        expect(response.body.name).toBe(invoiceProps.name)
        expect(response.body.document).toBe(invoiceProps.document)
        expect(response.body.street).toBe(invoiceProps.street)
        expect(response.body.number).toBe(invoiceProps.number)
        expect(response.body.complement).toBe(invoiceProps.complement)
        expect(response.body.city).toBe(invoiceProps.city)
        expect(response.body.state).toBe(invoiceProps.state)
        expect(response.body.zipCode).toBe(invoiceProps.zipCode)
        expect(response.body.total).toBe(totalExpected)
        expect(response.body.items[0].id).toBe(invoiceProps.items[0].id)
        expect(response.body.items[0].name).toBe(invoiceProps.items[0].name)
        expect(response.body.items[0].price).toBe(invoiceProps.items[0].price)
        expect(response.body.items[1].id).toBe(invoiceProps.items[1].id)
        expect(response.body.items[1].name).toBe(invoiceProps.items[1].name)
        expect(response.body.items[1].price).toBe(invoiceProps.items[1].price)
    })

    it('should find an invoice', async () => {
        const invoiceProps = {
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

        let response = await request(app).post('/invoices').send(invoiceProps)
        expect(response.body.id).toBeDefined()

        const requestProps = {
            id: response.body.id,
        }

        const totalExpected = 300

        response = await request(app).get(`/invoices/${requestProps.id}`).send()

        expect(response.body.id).toBe(requestProps.id)
        expect(response.body.name).toBe(invoiceProps.name)
        expect(response.body.document).toBe(invoiceProps.document)
        expect(response.body.address.street).toBe(invoiceProps.street)
        expect(response.body.address.number).toBe(invoiceProps.number)
        expect(response.body.address.complement).toBe(invoiceProps.complement)
        expect(response.body.address.city).toBe(invoiceProps.city)
        expect(response.body.address.state).toBe(invoiceProps.state)
        expect(response.body.address.zipCode).toBe(invoiceProps.zipCode)
        expect(response.body.total).toBe(totalExpected)
        expect(response.body.items[0].id).toBe(invoiceProps.items[0].id)
        expect(response.body.items[0].name).toBe(invoiceProps.items[0].name)
        expect(response.body.items[0].price).toBe(invoiceProps.items[0].price)
        expect(response.body.items[1].id).toBe(invoiceProps.items[1].id)
        expect(response.body.items[1].name).toBe(invoiceProps.items[1].name)
        expect(response.body.items[1].price).toBe(invoiceProps.items[1].price)
    })
})