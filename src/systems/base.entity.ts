import {
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	CreateDateColumn,
	Column,
} from "typeorm";
@Entity()
export class BaseEntity {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@UpdateDateColumn()
	updateAt: Date;

	@CreateDateColumn()
	createAt: Date;

	@Column({ type: "text", nullable: true })
	note: string;
}
