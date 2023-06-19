import { SupplierEntity } from "@/apis/supplier/entities/supplier.entity";
import { IMPORT_PRODUCTS_ORDER } from "@/constants/import_products_order";
import { BaseEntity } from "@/systems/base.entity";
import { Entity, Column, ManyToOne, OneToMany } from "typeorm";
import { ImportProductsDetailEntity } from "../../import-products-detail/entities/import-products-detail.entity";

@Entity("tb_import_product_order")
export class ImportProductsOrderEntity extends BaseEntity {
	@Column({ type: "varchar", nullable: false })
	supplier_code: string;

	// tổng tiền
	@Column({ type: "int", nullable: true, default: 0 })
	total_price: number;

	// phí ship
	@Column({ type: "int", nullable: true, default: 0 })
	fee_ship: number;

	// giá giảm
	@Column({ type: "int", nullable: true, default: 0 })
	down_price: number;

	// công nợ
	@Column({ type: "int", nullable: true, default: 0 })
	debt: number;

	// số tiền đã thanh toán
	@Column({ type: "int", nullable: true, default: 0 })
	payment_success: number;

	// số tiền cần thanh toán còn lại
	@Column({ type: "int", nullable: true, default: 0 })
	total_price_payment: number;

	// trạng thái
	@Column({
		type: "varchar",
		nullable: true,
		default: IMPORT_PRODUCTS_ORDER.CREATE,
	})
	status: string;

	// nhà cung cấp
	@ManyToOne(() => SupplierEntity, receive => receive.import_product_order)
	supplier: SupplierEntity;

	// danh sách chi tiết đơn nhập hàng
	@OneToMany(
		() => ImportProductsDetailEntity,
		import_products_detail => import_products_detail.import_product_order,
	)
	import_product_detail: ImportProductsDetailEntity[];
}
