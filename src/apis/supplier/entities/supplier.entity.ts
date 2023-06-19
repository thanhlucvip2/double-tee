import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "@/systems/base.entity";
import { ImportProductsOrderEntity } from "@/apis/import-products/import-products-order/entities/import-products-order.entity";

@Entity("tb_supplier")
export class SupplierEntity extends BaseEntity {
	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: false })
	address: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	supplier_code: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	phone_number: string;

	@Column({ type: "varchar", nullable: true })
	description: string;

	@OneToMany(
		() => ImportProductsOrderEntity,
		import_order => import_order.supplier,
	)
	import_product_order: ImportProductsOrderEntity[];
}
