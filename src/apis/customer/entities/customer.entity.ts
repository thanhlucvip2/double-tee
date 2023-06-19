import { ExportProductsOrderEntity } from "@/apis/export-products/export-products-order/entities/export-products-order.entity";
import { BaseEntity } from "@/systems/base.entity";
import { Column, Entity, OneToMany } from "typeorm";

@Entity("tb_customer")
export class CustomerEntity extends BaseEntity {
	@Column({ type: "varchar", length: 100 })
	name: string;

	@Column({ type: "text" })
	address: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	customer_code: string;

	@Column({ type: "varchar", nullable: true })
	description: string;

	@Column({ type: "varchar", unique: true })
	phone_number: string;

	@OneToMany(
		() => ExportProductsOrderEntity,
		export_order => export_order.customer,
	)
	export_product_order: ExportProductsOrderEntity[];
}
