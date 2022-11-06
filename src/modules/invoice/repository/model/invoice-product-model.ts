import {
    BelongsTo,
    Column,
    ForeignKey,
    Model,
    PrimaryKey,
    Table,
} from 'sequelize-typescript'
import InvoiceModel from './invoice-model'

@Table({
    tableName: 'invoice_products',
    timestamps: false,
})
export default class InvoiceProductModel extends Model {
    @PrimaryKey
    @Column({ allowNull: false })
    id: string

    @Column({ allowNull: false })
    name: string

    @Column({ allowNull: false })
    price: number

    @ForeignKey(() => InvoiceModel)
    @Column({ allowNull: false })
    declare invoice_id: string

    @BelongsTo(() => InvoiceModel)
    declare invoice: Awaited<InvoiceModel>
}