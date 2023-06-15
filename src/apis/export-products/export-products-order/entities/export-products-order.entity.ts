import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

import { BaseEntity } from '@/systems/base.entity';
import { CustomerEntity } from '@/apis/customer/entities/customer.entity';
import { EXPORT_PRODUCTS_ORDER } from '@/constants/export_products_order';

@Entity('tb_export_product_order')
export class ExportProductsOrderEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, unique: true })
  customer_code: string;

  // tổng tiền
  @Column({ type: 'int', nullable: true, default: 0 })
  total_price: number;

  // phí ship
  @Column({ type: 'int', nullable: true, default: 0 })
  fee_ship: number;

  // giá giảm
  @Column({ type: 'int', nullable: true, default: 0 })
  down_price: number;

  // công nợ
  @Column({ type: 'int', nullable: true, default: 0 })
  debt: number;

  // số tiền đã thanh toán
  @Column({ type: 'int', nullable: true, default: 0 })
  payment_success: number;

  // số tiền cần thanh toán còn lại
  @Column({ type: 'int', nullable: true, default: 0 })
  total_price_payment: number;

  // trạng thái
  @Column({
    type: 'varchar',
    nullable: true,
    default: EXPORT_PRODUCTS_ORDER.CREATE,
  })
  status: string;

  // khách hàng
  @ManyToOne(() => CustomerEntity, (customer) => customer.export_product_order)
  customer: CustomerEntity;
}
