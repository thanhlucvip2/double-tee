import { ExportProductsDetailEntity } from "@/apis/export-products/export-products-detail/entities/export-products-detail.entity";
import { ImportProductsDetailEntity } from "@/apis/import-products/import-products-detail/entities/import-products-detail.entity";
import { InventoryEntity } from "@/apis/inventory/entities/inventory.entity";
import { BaseEntity } from "@/systems/base.entity";
import { Entity, Column, OneToMany } from "typeorm";
@Entity({ name: "tb_products_type" })
export class ProductsTypeEntity extends BaseEntity {
	@Column({ type: "varchar", nullable: false })
	name: string;

	@Column({ type: "varchar", nullable: false, unique: true })
	sku: string;

	@Column({ type: "text", nullable: true })
	description: string;

	@OneToMany(
		() => ImportProductsDetailEntity,
		import_product_detail => import_product_detail.products_type,
	)
	import_product_detail: ImportProductsDetailEntity[];

	@OneToMany(
		() => ExportProductsDetailEntity,
		import_product_detail => import_product_detail.products_type,
	)
	export_product_detail: ExportProductsDetailEntity[];

	@OneToMany(() => InventoryEntity, inventory => inventory.products_type)
	inventory: InventoryEntity[];
}
