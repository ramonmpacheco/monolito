import { app, sequelize } from '../express'
import request from 'supertest'
import ClientAdmFacadeFactory from '../../modules/client-adm/factory/client-adm.facade.factory'

describe('Client E2E tests', () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true })
  })

  afterAll(async () => {
    await sequelize.close()
  })

  it('should create a client', async () => {
    const requestProps = {
      name: 'Client 1',
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

    const response = await request(app).post('/clients').send(requestProps)
    expect(response.statusCode).toBe(200)

    const clientAdmFacadeFactory = ClientAdmFacadeFactory.create()
  })
})