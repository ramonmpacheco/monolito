import UseCaseInterface from "../../@shared/usecase/use-case.interface"
import InvoiceFacadeInterface, { FindInvoiceFacadeInputDTO, FindInvoiceFacadeOutputDTO, GenerateInvoiceFacadeInputDto, GenerateInvoiceFacadeOutputDto } from "./invoice-facade-interface"

export interface UseCasesProps {
    generateUseCase: UseCaseInterface
    findUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
    private _generateUseCase: UseCaseInterface
    private _findUseCase: UseCaseInterface

    constructor(props: UseCasesProps) {
        this._generateUseCase = props.generateUseCase
        this._findUseCase = props.findUseCase
    }

    async generate(
        input: GenerateInvoiceFacadeInputDto
    ): Promise<GenerateInvoiceFacadeOutputDto> {
        return this._generateUseCase.execute(input)
    }

    async find(
        input: FindInvoiceFacadeInputDTO
    ): Promise<FindInvoiceFacadeOutputDTO> {
        return this._findUseCase.execute(input)
    }
}