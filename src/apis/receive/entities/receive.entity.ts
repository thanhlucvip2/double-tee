import { ProductsTypeEntity } from '@/apis/products-type/entities/products-type.entity';
import { SupplierEntity } from '@/apis/supplier/entities/supplier.entity';
import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('tb_receive')
export class ReceiveEntity extends BaseEntity {
  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  fee_shipping: number;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ type: 'varchar', length: 20, nullable: false })
  sku: string;

  @ManyToOne(() => ProductsTypeEntity, (product_type) => product_type.receive)
  products_type: ProductsTypeEntity;

  @ManyToOne(() => SupplierEntity, (supplier) => supplier.receive)
  supplier: SupplierEntity;
}
