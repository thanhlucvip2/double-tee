import { SupplierEntity } from '@/apis/supplier/entities/supplier.entity';
import { IMPORT_PRODUCTS_ORDER } from '@/constants/import_products_order';
import { BaseEntity } from '@/systems/base.entity';
import { Entity, Column, ManyToOne } from 'typeorm';

@Entity()
export class ImportProductsOrderEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  supplier_code: string;

  // tổng tiền
  @Column({ type: 'int', nullable: true, default: 0 })
  total_price: number;

  // giá giảm
  @Column({ type: 'int', nullable: true, default: 0 })
  down_price: string;

  // công nợ
  @Column({ type: 'int', nullable: true, default: 0 })
  debt: string;

  // phí ship
  @Column({ type: 'int', nullable: true, default: 0 })
  fee_ship: string;

  // trạng thái
  @Column({
    type: 'varchar',
    nullable: true,
    default: IMPORT_PRODUCTS_ORDER.CREATE,
  })
  status: string;

  @ManyToOne(() => SupplierEntity, (receive) => receive.import_product_order)
  supplier: SupplierEntity;
}
