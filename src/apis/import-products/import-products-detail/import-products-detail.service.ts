import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateImportProductsDetailDto } from "./dto/create-import-products-detail.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ImportProductsDetailEntity } from "./entities/import-products-detail.entity";
import { EntityManager, Repository } from "typeorm";
import { ProductsTypeEntity } from "@/apis/products-type/entities/products-type.entity";
import { ImportProductsOrderEntity } from "../import-products-order/entities/import-products-order.entity";
import { IMPORT_PRODUCTS_ORDER } from "@/constants/import_products_order";

@Injectable()
export class ImportProductsDetailService {
	constructor(
		@InjectRepository(ImportProductsDetailEntity)
		private readonly importProductsDetailRepository: Repository<ImportProductsDetailEntity>,
		@InjectRepository(ProductsTypeEntity)
		private readonly productTypeRepository: Repository<ProductsTypeEntity>,
		@InjectRepository(ImportProductsOrderEntity)
		private readonly importProductsOrderRepository: Repository<ImportProductsOrderEntity>,
		private entityManager: EntityManager,
	) {}
	async create({
		sku,
		size,
		color,
		price,
		quantity,
		down_price,
		note,
		import_product_order_id,
	}: CreateImportProductsDetailDto) {
		const productsType = await this.productTypeRepository.findOne({
			where: { sku },
		});
		if (!productsType) {
			throw new HttpException(
				"Mã sản phẩm không tồn tại trong hệ thống!",
				HttpStatus.BAD_REQUEST,
			);
		}
		const importProductOrder = await this.importProductsOrderRepository.findOne(
			{
				where: { id: import_product_order_id },
				relations: ["import_product_detail"],
			},
		);
		if (!importProductOrder) {
			throw new HttpException(
				"Đơn hàng không tồn tại trong hệ thống!",
				HttpStatus.BAD_REQUEST,
			);
		}
		// check đơn hàng đã done chưa
		if (importProductOrder.status === IMPORT_PRODUCTS_ORDER.DONE) {
			throw new HttpException(
				"Đơn hàng đã kết thúc không thể tạo thêm!",
				HttpStatus.BAD_REQUEST,
			);
		}
		const importProductsDetail =
			await this.importProductsDetailRepository.create({
				sku,
				color,
				size,
				price,
				note,
				down_price,
				quantity,
				total_price: price * quantity - down_price,
				products_type: productsType,
				import_product_order: importProductOrder,
			});

		await this.importProductsDetailRepository.save(importProductsDetail);

		// TODO : queryBuilder
		const queryBuilder = this.entityManager
			.createQueryBuilder(ImportProductsDetailEntity, "import_products_detail")
			.select("SUM(import_products_detail.total_price)", "total_price")
			.innerJoin(
				ImportProductsOrderEntity,
				"importProductOrder",
				"importProductOrder.id = import_products_detail.importProductOrderId",
			)
			.where("importProductOrder.id = :id", {
				id: import_product_order_id,
			});

		const result = await queryBuilder.getRawOne();
		const totalPrice = result.total_price;

		await this.importProductsOrderRepository.update(
			{
				id: import_product_order_id,
			},
			{
				total_price: +totalPrice,
				debt:
					+totalPrice +
					+importProductOrder.fee_ship -
					+importProductOrder.down_price -
					+importProductOrder.payment_success,
				total_price_payment:
					+totalPrice +
					+importProductOrder.fee_ship -
					+importProductOrder.down_price,
				status: IMPORT_PRODUCTS_ORDER.PROCESSING,
			},
		);

		return await this.importProductsDetailRepository.findOne({
			where: { id: importProductsDetail.id },
			relations: ["products_type", "import_product_order"],
		});
	}

	async findOne(id: string) {
		const importProductsTypeDetail =
			await this.importProductsDetailRepository.findOne({
				where: { id },
				relations: ["products_type", "import_product_order"],
			});
		if (!importProductsTypeDetail) {
			throw new HttpException(
				"Chi tiết đơn hàng không tồn tại trong hệ thống!",
				HttpStatus.BAD_REQUEST,
			);
		}
		return importProductsTypeDetail;
	}

	async remove(id: string) {
		const importProductsTypeDetail =
			await this.importProductsDetailRepository.findOne({
				where: { id },
				relations: ["import_product_order"],
			});

		if (!importProductsTypeDetail) {
			throw new HttpException(
				"Chi tiết đơn hàng không tồn tại trong hệ thống!",
				HttpStatus.BAD_REQUEST,
			);
		}

		const import_product_order_id =
			importProductsTypeDetail.import_product_order.id;

		// nếu đơn order done thi không được xóa
		if (
			importProductsTypeDetail.import_product_order.status ===
			IMPORT_PRODUCTS_ORDER.DONE
		) {
			throw new HttpException(
				"Đơn hàng đã kết thúc không được xóa chi tiết đơn!",
				HttpStatus.BAD_REQUEST,
			);
		}
		if (
			importProductsTypeDetail.import_product_order.payment_success >
			importProductsTypeDetail.import_product_order.total_price -
				importProductsTypeDetail.total_price
		) {
			throw new HttpException(
				"Số tiền đã thanh toán đang lớn hơn số tiền order!",
				HttpStatus.BAD_REQUEST,
			);
		}
		await this.importProductsDetailRepository.delete({ id });
		await this.importProductsOrderRepository.update(
			{
				id: import_product_order_id,
			},
			{
				total_price:
					importProductsTypeDetail.import_product_order.total_price -
					importProductsTypeDetail.total_price,
				debt:
					importProductsTypeDetail.import_product_order.total_price -
					importProductsTypeDetail.total_price +
					+importProductsTypeDetail.import_product_order.fee_ship -
					+importProductsTypeDetail.import_product_order.down_price -
					+importProductsTypeDetail.import_product_order.payment_success,
				total_price_payment:
					importProductsTypeDetail.import_product_order.total_price -
					importProductsTypeDetail.total_price,
			},
		);
		return {
			message: "Xóa thành công chi tiết đơn",
		};
	}
}
