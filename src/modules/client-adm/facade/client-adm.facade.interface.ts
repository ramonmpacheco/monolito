import { AddClientOutputDto } from "../usecase/add-client/add-client.usecase.dto"

export interface AddClientFacadeInputDto {
    id?: string
    name: string
    email: string
    document: string
    address: {
        street: string
        number: string
        complement: string
        city: string
        state: string
        zipCode: string
    }
}

export interface FindClientFacadeInputDto {
    id: string;
}

export interface FindClientFacadeOutputDto {
    id: string;
    name: string;
    email: string;
    address: {
        street: string
        number: string
        complement: string
        city: string
        state: string
        zipCode: string
    }
    createdAt: Date;
    updatedAt: Date;
    document: string
}

export default interface ClientAdmFacadeInterface {
    add(input: AddClientFacadeInputDto): Promise<AddClientOutputDto>;
    find(input: FindClientFacadeInputDto): Promise<FindClientFacadeOutputDto>;
}