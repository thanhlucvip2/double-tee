import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { CreateExportProductsOrderDto } from "./dto/create-export-products-order.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { ExportProductsOrderEntity } from "./entities/export-products-order.entity";
import { Repository } from "typeorm";
import { CustomerEntity } from "@/apis/customer/entities/customer.entity";
import { PaginationDto } from "@/shared/pagination.dto";
import { ResponsePagination } from "@/shared/response.pagination";

@Injectable()
export class ExportProductsOrderService {
	constructor(
		@InjectRepository(ExportProductsOrderEntity)
		private readonly exportProductsOrderRepository: Repository<ExportProductsOrderEntity>,
		@InjectRepository(CustomerEntity)
		private readonly customerRepository: Repository<CustomerEntity>,
	) {}

	async create({ customer_code, note }: CreateExportProductsOrderDto) {
		const customerData = await this.customerRepository.findOne({
			where: { customer_code },
		});

		if (!customerData) {
			throw new HttpException(
				"Mã khách hàng không tồn tại trong hệ thống!",
				HttpStatus.BAD_REQUEST,
			);
		}

		const newExportPRoductsOrder =
			await this.exportProductsOrderRepository.create({
				customer_code,
				note,
				customer: customerData,
			});

		await this.exportProductsOrderRepository.save(newExportPRoductsOrder);

		return await this.exportProductsOrderRepository.findOne({
			where: { id: newExportPRoductsOrder.id },
			relations: ["customer"],
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

		const [exportProductsOrder, exportProductsOrderCount] =
			await this.exportProductsOrderRepository.findAndCount({
				skip: pageIndex * pageSize,
				take: pageSize,
			});

		const result = new ResponsePagination<ExportProductsOrderEntity>({
			pageIndex: +pageIndex,
			pageSize: +pageSize,
			total: exportProductsOrderCount,
			data: exportProductsOrder,
		});
		return result;
	}

	async findOne(id: string) {
		const exportProductsOrder =
			await this.exportProductsOrderRepository.findOne({
				where: { id },
				relations: ["customer"],
			});
		if (!exportProductsOrder) {
			throw new HttpException(
				"Đơn xuất hàng không tồn tại!",
				HttpStatus.BAD_REQUEST,
			);
		}
		return exportProductsOrder;
	}
}
