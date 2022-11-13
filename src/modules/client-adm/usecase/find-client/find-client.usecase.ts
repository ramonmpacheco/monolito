import ClientGateway from "../../gateway/client.gateway";
import {
    FindClientInputDto,
    FindClientOutputDto,
} from "./find-client.usecase.dto";

export default class FindClientUseCase {
    private _clientRepository: ClientGateway;

    constructor(clientRepository: ClientGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindClientInputDto): Promise<FindClientOutputDto> {
        const client = await this._clientRepository.find(input.id);

        return {
            id: client.id.id,
            name: client.name,
            document: client.document,
            email: client.email,
            address: {
                street: client.address.street,
                number: client.address.number,
                city: client.address.city,
                zipCode: client.address.zipCode,
                complement: client.address.complement,
                state: client.address.state,
            },
            createdAt: client.createdAt,
            updatedAt: client.updatedAt,
        };
    }
}