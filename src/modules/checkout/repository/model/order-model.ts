import { Column, HasMany, Model, PrimaryKey, Table } from 'sequelize-typescript'
import { OrderProductModel } from './order-product-model'

@Table({
  tableName: 'orders',
  timestamps: false,
})
export class OrderModel extends Model {
  @PrimaryKey
  @Column({ allowNull: false })
  id: string

  @Column({ allowNull: false })
  status: string

  @Column({ allowNull: false })
  clientId: string

  @HasMany(() => OrderProductModel)
  declare products: OrderProductModel[]

  @Column({ allowNull: false })
  createdAt: Date

  @Column({ allowNull: false })
  updatedAt: Date
}