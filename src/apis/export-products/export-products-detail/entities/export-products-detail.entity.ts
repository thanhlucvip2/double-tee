import { Column, Entity, ManyToOne } from "typeorm";

import { BaseEntity } from "@/systems/base.entity";
import { ProductsTypeEntity } from "@/apis/products-type/entities/products-type.entity";
import { ExportProductsOrderEntity } from "../../export-products-order/entities/export-products-order.entity";

@Entity("tb_export_product_detail")
export class ExportProductsDetailEntity extends BaseEntity {
	@Column({ type: "varchar", nullable: false })
	sku: string;

	@Column({ type: "varchar", nullable: false })
	size: string;

	@Column({ type: "varchar", nullable: false })
	color: string;

	@Column({ type: "int", nullable: false })
	price: number;

	@Column({ type: "int", nullable: false })
	quantity: number;

	@Column({ type: "int", nullable: false })
	total_price: number;

	@Column({ type: "int", nullable: true, default: 0 })
	down_price: number;

	@ManyToOne(
		() => ProductsTypeEntity,
		products_type => products_type.export_product_detail,
	)
	products_type: ProductsTypeEntity;

	@ManyToOne(
		() => ExportProductsOrderEntity,
		export_products => export_products.export_product_detail,
	)
	export_product_order: ExportProductsOrderEntity;
}
