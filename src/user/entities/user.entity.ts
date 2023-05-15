import { BaseEntity } from '@/systems/base.entity';
import { ROLE } from '@/constants/role';
import { USER_STATUS } from '@/constants/user-status';
import { Entity, Column } from 'typeorm';

@Entity({ name: 'tb_user' })
export class UserEntity extends BaseEntity {
  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'text' })
  password: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'int', nullable: true })
  veryCode: string;

  @Column({
    type: 'varchar',
    default: ROLE.USER,
    nullable: true,
  })
  role: string;
  @Column({
    type: 'varchar',
    default: USER_STATUS.CREATE,
    nullable: true,
  })
  userStatus: string;
}
