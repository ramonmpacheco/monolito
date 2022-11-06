import GenerateInvoiceUseCase from "./generate-invoice-usecase"

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn(),
    }
}

describe('Generate invoice usecase unit test', () => {
    it('should generate an invoice passing an invoice id', async () => {
        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

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

        const result = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalledTimes(1)
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

    it('should generate an invoice do not passing an invoice id', async () => {
        const repository = MockRepository()
        const usecase = new GenerateInvoiceUseCase(repository)

        const input = {
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

        const result = await usecase.execute(input)

        expect(repository.generate).toHaveBeenCalledTimes(1)
        expect(result.id).toBeDefined()
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
})