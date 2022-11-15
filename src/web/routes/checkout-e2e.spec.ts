import { app, sequelize } from '../express'
import request from 'supertest'

describe('Checkout E2E tests', () => {
  beforeEach(async () => {
    jest.setTimeout(60000);
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should place an order', async () => {
    const requestClientProps = {
      name: 'Client 1 Gabriel',
      email: 'x@x.com',
      document: 'document',
      address: {
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipcode',
      },
    }

    const responseClient = await request(app)
      .post('/clients')
      .send(requestClientProps)
    expect(responseClient.statusCode).toBe(200)

    const requestProduct1Props = {
      name: 'name 1',
      description: 'description 1',
      purchasePrice: 300,
      stock: 4,
    }
    const responseProduct1 = await request(app)
      .post('/products')
      .send(requestProduct1Props)
    expect(responseProduct1.body.id).toBeDefined()

    const requestCatalogProduct1Props = {
      id: responseProduct1.body.id,
      name: 'name 1',
      description: 'description 1',
      salesPrice: 300,
    }
    const responseCatalogProduct1 = await request(app)
      .post('/catalogs')
      .send(requestCatalogProduct1Props)
    expect(responseCatalogProduct1.body.id).toBeDefined()

    const requestProduct2Props = {
      name: 'name 2',
      description: 'description 2',
      purchasePrice: 300,
      stock: 4,
    }
    const responseProduct2 = await request(app)
      .post('/products')
      .send(requestProduct2Props)
    expect(responseProduct2.body.id).toBeDefined()

    const requestCatalogProduct2Props = {
      id: responseProduct2.body.id,
      name: 'name 2',
      description: 'description 2',
      salesPrice: 300,
    }
    const responseCatalogProduct2 = await request(app)
      .post('/catalogs')
      .send(requestCatalogProduct2Props)
    expect(responseCatalogProduct2.body.id).toBeDefined()

    const requestCheckoutProps = {
      clientId: responseClient.body.id,
      products: [
        {
          productId: responseProduct1.body.id,
        },
        {
          productId: responseProduct2.body.id,
        },
      ],
    }

    const responseCheckout = await request(app)
      .post('/checkout')
      .send(requestCheckoutProps)

    expect(responseCheckout.body.id).toBeDefined()
    expect(responseCheckout.body.invoiceId).toBeDefined()
    expect(responseCheckout.body.status).toBe('approved')
    expect(responseCheckout.body.total).toBe(600)
    expect(responseCheckout.body.products).toStrictEqual([
      {
        productId: requestCheckoutProps.products[0].productId,
      },
      {
        productId: requestCheckoutProps.products[1].productId,
      },
    ])
    expect(true).toBe(true)
  })
})