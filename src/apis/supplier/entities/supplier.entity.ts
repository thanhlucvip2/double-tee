import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '@/systems/base.entity';
import { ReceiveEntity } from '@/apis/receive/entities/receive.entity';

@Entity('tb_supplier')
export class SupplierEntity extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  phone_number: string;

  @Column({ type: 'varchar', length: 20, nullable: false, unique: true })
  supplier_code: string;

  @OneToMany(() => ReceiveEntity, (receive) => receive.supplier)
  receive: ReceiveEntity[];
}
