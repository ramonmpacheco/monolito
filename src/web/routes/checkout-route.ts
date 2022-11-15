import express, { Request, Response } from 'express'
import PlaceOrderUseCaseFactory from '../../modules/checkout/factory/place-order-usecase-factory'

export const checkoutRoute = express.Router()

checkoutRoute.post('/', async (req: Request, res: Response) => {
  const usecase = PlaceOrderUseCaseFactory.create()
  try {
    const inputDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    }
    const output = await usecase.execute(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})