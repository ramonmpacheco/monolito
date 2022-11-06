import BaseEntity from "../../@shared/domain/entity/base.entity"
import Id from "../../@shared/domain/value-object/id.value-object"

type ProductProps = {
    id?: Id
    name: string
    price: number
}

export default class Product extends BaseEntity {
    constructor(private props: ProductProps) {
        super(props.id)
    }

    get name(): string {
        return this.props.name
    }

    get price(): number {
        return this.props.price
    }
}