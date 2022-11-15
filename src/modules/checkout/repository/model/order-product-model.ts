import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import { OrderModel } from './order-model'

@Table({
    tableName: 'order_products',
    timestamps: false,
})
export class OrderProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false })
    description: string

    @Column({ allowNull: false })
    salesPrice: number

    @ForeignKey(() => OrderModel)
    @Column({ allowNull: false })
    declare order_id: string

    @BelongsTo(() => OrderModel)
    declare order: Awaited<OrderModel>
}