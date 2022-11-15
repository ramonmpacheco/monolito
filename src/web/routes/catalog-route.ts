import express, { Request, Response } from 'express'
import StoreCatalogFacadeFactory from '../../modules/store-catalog/factory/facade.factory'
import ProductRepository from '../../modules/store-catalog/repository/product.repository'

export const catalogRoute = express.Router()

catalogRoute.post('/', async (req: Request, res: Response) => {
  const usecase = StoreCatalogFacadeFactory.create()
  try {
    const inputDto = {
      id: req.body.id,
      name: req.body.name,
      description: req.body.description,
      salesPrice: req.body.salesPrice,
    }
    const output = await usecase.add(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})