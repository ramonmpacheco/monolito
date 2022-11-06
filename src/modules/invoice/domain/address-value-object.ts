import ValueObject from "../../@shared/domain/value-object/value-object.interface"

type AddressProps = {
    street: string
    number: string
    complement: string
    city: string
    state: string
    zipCode: string
}

export default class Address implements ValueObject {
    constructor(private props: AddressProps) { }

    get street(): string {
        return this.props.street
    }

    get number(): string {
        return this.props.number
    }

    get complement(): string {
        return this.props.complement
    }

    get city(): string {
        return this.props.city
    }

    get state(): string {
        return this.props.state
    }

    get zipCode(): string {
        return this.props.zipCode
    }
}