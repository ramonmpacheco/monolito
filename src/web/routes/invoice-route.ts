import express, { Request, Response } from 'express'
import InvoiceFactory from '../../modules/invoice/factory/invoice-factory'

export const invoiceRoute = express.Router()

invoiceRoute.post('/', async (req: Request, res: Response) => {
  const usecase = InvoiceFactory.creatInvoiceFacadeFactory()
  try {
    const inputDto = {
      name: req.body.name,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
      items: req.body.items.map((i: any) => ({
        id: i.id,
        name: i.name,
        price: i.price,
      })),
    }
    const output = await usecase.generate(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  const usecase = InvoiceFactory.creatInvoiceFacadeFactory()
  try {
    const inputDto = {
      id: req.params.id,
    }
    const output = await usecase.find(inputDto)
    res.send(output)
  } catch (error) {
    res.status(500).send(error)
  }
})