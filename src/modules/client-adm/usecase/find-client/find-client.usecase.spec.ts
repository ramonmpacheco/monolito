import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../domain/address-value-object";
import Client from "../../domain/client.entity";
import FindClientUseCase from "./find-client.usecase";

const client = new Client({
    id: new Id('1'),
    name: 'Client 1',
    document: 'document',
    email: 'x@x.com',
    address: new Address({
        street: 'street',
        number: 'number',
        complement: 'complement',
        city: 'city',
        state: 'state',
        zipCode: 'zipcode',
    }),
});

const MockRepository = () => {
    return {
        add: jest.fn(),
        find: jest.fn().mockReturnValue(Promise.resolve(client)),
    };
};

describe("Find Client Usecase unit test", () => {
    it("should find a client", async () => {
        const repository = MockRepository();
        const usecase = new FindClientUseCase(repository);

        const input = {
            id: "1",
        };

        const result = await usecase.execute(input);

        expect(repository.find).toHaveBeenCalled()
        expect(result.id).toEqual(input.id)
        expect(result.name).toEqual(client.name)
        expect(result.email).toEqual(client.email)
        expect(result.document).toEqual(client.document)
        expect(result.address.street).toEqual(client.address.street)
        expect(result.address.number).toEqual(client.address.number)
        expect(result.address.zipCode).toEqual(client.address.zipCode)
        expect(result.address.state).toEqual(client.address.state)
        expect(result.address.complement).toEqual(client.address.complement)
        expect(result.address.city).toEqual(client.address.city)
        expect(result.createdAt).toEqual(client.createdAt)
        expect(result.updatedAt).toEqual(client.updatedAt)
    });
});