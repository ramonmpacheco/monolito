import { app, sequelize } from '../express'
import request from 'supertest'

describe('Product E2E tests', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a product', async () => {
    const requestProps = {
      name: 'name',
      description: 'description',
      purchasePrice: 300,
      stock: 4,
    }
    const response = await request(app).post('/products').send(requestProps)

    expect(response.body.id).toBeDefined()
    expect(response.body.createdAt).toBeDefined()
    expect(response.body.updatedAt).toBeDefined()
    expect(response.body.name).toBe(requestProps.name)
    expect(response.body.description).toBe(requestProps.description)
    expect(response.body.purchasePrice).toBe(requestProps.purchasePrice)
    expect(response.body.stock).toBe(requestProps.stock)
  })
})