import { Entity, Column } from 'typeorm';
import { BaseEntity } from '@/systems/base.entity';

@Entity('tb_supplier')
export class SupplierEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  supplier_code: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  phone_number: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  // @OneToMany(() => ReceiveEntity, (receive) => receive.supplier)
  // receive: ReceiveEntity[];
}
