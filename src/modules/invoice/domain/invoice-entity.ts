import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface"
import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value-object/id.value-object"
import Address from "./address-value-object"
import Product from "./product-entity"

type InvoiceProps = {
    id?: Id
    name: string
    document: string
    address: Address
    items: Product[]
    createdAt?: Date
    updatedAt?: Date
}

export default class Invoice extends BaseEntity implements AggregateRoot {
    constructor(private props: InvoiceProps) {
        super(props.id)
    }

    get name(): string {
        return this.props.name
    }

    get document(): string {
        return this.props.document
    }

    get address(): Address {
        return this.props.address
    }

    get items(): Product[] {
        return this.props.items
    }
}