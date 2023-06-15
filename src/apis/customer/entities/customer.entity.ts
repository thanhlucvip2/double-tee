import { BaseEntity } from '@/systems/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('tb_customer')
export class CustomerEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'text' })
  address: string;

  @Column({ type: 'varchar', nullable: false, unique: true })
  customer_code: string;

  @Column({ type: 'varchar', nullable: true })
  description: string;

  @Column({ type: 'varchar', unique: true })
  phone_number: string;
}
