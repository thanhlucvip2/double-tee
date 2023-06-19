import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateImportProductsOrderDto } from "./dto/create-import-products-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ImportProductsOrderEntity } from "./entities/import-products-order.entity";
import { Repository } from "typeorm";
import { SupplierEntity } from "@/apis/supplier/entities/supplier.entity";
import { PaginationDto } from "@/shared/pagination.dto";
import { ResponsePagination } from "@/shared/response.pagination";
import { PaymentOrderDto } from "./dto/payment-import-products-order.dto";
import { IMPORT_PRODUCTS_ORDER } from "@/constants/import_products_order";
import { InventoryService } from "@/apis/inventory/inventory.service";

@Injectable()
export class ImportProductsOrderService {
	constructor(
		@InjectRepository(ImportProductsOrderEntity)
		private readonly importProductsOrderRepository: Repository<ImportProductsOrderEntity>,
		@InjectRepository(SupplierEntity)
		private readonly supplierRepository: Repository<SupplierEntity>,
		private readonly inventoryService: InventoryService,
	) {}

	async create({ supplier_code, note }: CreateImportProductsOrderDto) {
		const supplierData = await this.supplierRepository.findOne({
			where: { supplier_code },
		});
		if (!supplierData) {
			throw new HttpException(
				"Mã nhà cung cấp không tồn tại trong hệ thống!",
				HttpStatus.BAD_REQUEST,
			);
		}
		const newImportPRoductsOrder =
			await this.importProductsOrderRepository.create({
				supplier_code,
				note,
				supplier: supplierData,
			});
		await this.importProductsOrderRepository.save(newImportPRoductsOrder);
		return await this.importProductsOrderRepository.findOne({
			where: { id: newImportPRoductsOrder.id },
			relations: ["supplier"],
		});
	}

	async findAll(pagination: PaginationDto) {
		const {
			// fromDate = new Date(),
			// toDate = new Date(),
			pageIndex = 0,
			pageSize = 10,
		} = pagination;

		// const sqlFromDate = convertDateTimeToDateString(fromDate);
		// const sqlToDate = convertDateTimeToDateString(adddate(toDate, 1)); // tặng thêm 1 ngày cho date hiện tại

		const [importProductsOrder, importProductsOrderCount] =
			await this.importProductsOrderRepository.findAndCount({
				skip: pageIndex * pageSize,
				take: pageSize,
			});

		const result = new ResponsePagination<ImportProductsOrderEntity>({
			pageIndex: +pageIndex,
			pageSize: +pageSize,
			total: importProductsOrderCount,
			data: importProductsOrder,
		});
		return result;
	}

	async findOne(id: string) {
		const importProductsOrder =
			await this.importProductsOrderRepository.findOne({
				where: { id },
				relations: ["supplier", "import_product_detail"],
			});
		if (!importProductsOrder) {
			throw new HttpException(
				"Đơn nhập hàng không tồn tại!",
				HttpStatus.BAD_REQUEST,
			);
		}
		return importProductsOrder;
	}

	//TODO chưa remove được
	async remove(id: string) {
		return await this.inventoryService.findAll({ pageSize: 10, pageIndex: 0 });
	}

	async paymentOrder({
		down_price,
		fee_ship,
		payment_success,
		import_product_order_id,
	}: PaymentOrderDto) {
		const importProductsOrder =
			await this.importProductsOrderRepository.findOne({
				where: { id: import_product_order_id },
				relations: ["supplier", "import_product_detail"],
			});
		if (!importProductsOrder) {
			throw new HttpException(
				"Đơn nhập hàng không tồn tại!",
				HttpStatus.BAD_REQUEST,
			);
		}

		// check đơn đã ở trạng thái done chưa
		if (importProductsOrder.status === IMPORT_PRODUCTS_ORDER.DONE) {
			throw new HttpException(
				"Đơn đã hoàn thành không được cập nhật!",
				HttpStatus.BAD_REQUEST,
			);
		}

		const debt =
			+importProductsOrder.total_price +
			+fee_ship -
			+down_price -
			+payment_success;

		if (debt < 0) {
			throw new HttpException(
				"Chi phí thanh toán không được lớn hơn số tiền nợ công!",
				HttpStatus.BAD_REQUEST,
			);
		}
		// return debt;
		await this.importProductsOrderRepository.update(
			{
				id: import_product_order_id,
			},
			{
				debt,
				fee_ship,
				down_price,
				payment_success,
				// chỉnh lại status done khi thanh toán hết
				status:
					debt === 0 && importProductsOrder.total_price !== 0
						? IMPORT_PRODUCTS_ORDER.DONE
						: importProductsOrder.status,
			},
		);

		const loadImportProducts = await this.importProductsOrderRepository.findOne(
			{
				where: { id: import_product_order_id },
				relations: ["supplier", "import_product_detail"],
			},
		);
		// nếu thanh toán thành công thì nhập vào kho hàng
		if (loadImportProducts.status === IMPORT_PRODUCTS_ORDER.DONE) {
			await this.inventoryService.createInventory(
				loadImportProducts.import_product_detail.map(item => {
					return {
						sku: item.sku,
						size: item.size,
						color: item.color,
						quantity: item.quantity,
					};
				}),
			);
		}
		return loadImportProducts;
	}
}
