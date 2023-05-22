import { ProductsTypeEntity } from '@/apis/products-type/entities/products-type.entity';
import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { ImportProductsOrderEntity } from '../../import-products-order/entities/import-products-order.entity';

@Entity('tb_import_product_detail')
export class ImportProductsDetailEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  sku: string;

  @Column({ type: 'varchar', nullable: false })
  size: string;

  @Column({ type: 'varchar', nullable: false })
  color: string;

  @Column({ type: 'int', nullable: false })
  price: number;

  @Column({ type: 'int', nullable: false })
  quantity: number;

  @Column({ type: 'int', nullable: false })
  total_price: number;

  @Column({ type: 'int', nullable: true, default: 0 })
  down_price: number;

  @ManyToOne(
    () => ProductsTypeEntity,
    (products_type) => products_type.import_product_detail,
  )
  products_type: ProductsTypeEntity;

  @ManyToOne(
    () => ImportProductsOrderEntity,
    (products_type) => products_type.import_product_detail,
  )
  import_product_order: ImportProductsOrderEntity;
}
