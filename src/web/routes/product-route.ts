import express, { Request, Response } from 'express'
import ProductAdmFacadeFactory from '../../modules/product-adm/factory/facade.factory'

export const productRoute = express.Router()

productRoute.post('/', async (req: Request, res: Response) => {
    const usecase = ProductAdmFacadeFactory.create()
    try {
        const inputDto = {
            id: req.body.id,
            name: req.body.name,
            description: req.body.description,
            purchasePrice: req.body.purchasePrice,
            stock: req.body.stock,
        }
        const output = await usecase.addProduct(inputDto)
        res.send(output)
    } catch (error) {
        res.status(500).send(error)
    }
})