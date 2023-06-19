import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCustomerDto } from "./dto/create-customer.dto";
import { UpdateCustomerDto } from "./dto/update-customer.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { CustomerEntity } from "./entities/customer.entity";
import { Repository } from "typeorm";
import { PaginationDto } from "@/shared/pagination.dto";
import { ResponsePagination } from "@/shared/response.pagination";

@Injectable()
export class CustomerService {
	constructor(
		@InjectRepository(CustomerEntity)
		private readonly customerRepository: Repository<CustomerEntity>,
	) {}

	async create({
		name,
		address,
		customer_code,
		phone_number,
		description,
		note,
	}: CreateCustomerDto) {
		const checkPhoneNumber = await this.customerRepository.findOne({
			where: { phone_number },
		});
		if (checkPhoneNumber) {
			throw new HttpException(
				"Số điện thoại đã tồn tại trong hệ thống",
				HttpStatus.BAD_REQUEST,
			);
		}
		const checkSupplierCode = await this.customerRepository.findOne({
			where: { customer_code },
		});
		if (checkSupplierCode) {
			throw new HttpException(
				"Mã khách hàng đã tồn tại trong hệ thống",
				HttpStatus.BAD_REQUEST,
			);
		}
		const newProduct = await this.customerRepository.create({
			name,
			address,
			customer_code,
			phone_number,
			description,
			note,
		});
		await this.customerRepository.save(newProduct);

		return newProduct;
	}

	async findAll(pagination: PaginationDto) {
		const { pageIndex = 0, pageSize = 10 } = pagination;
		const [supplier, supplierCount] =
			await this.customerRepository.findAndCount({
				skip: pageIndex * pageSize,
				take: pageSize,
			});

		const result = new ResponsePagination<CustomerEntity>({
			pageIndex: +pageIndex,
			pageSize: +pageSize,
			total: supplierCount,
			data: supplier,
		});
		return result;
	}

	async findOne(id: string) {
		const customer = await this.customerRepository.findOne({
			where: { id },
			relations: ["export_product_order"],
		});
		if (!customer) {
			throw new HttpException(
				"Khách hàng không tồn tại!",
				HttpStatus.BAD_REQUEST,
			);
		}
		return customer;
	}

	async update(
		id: string,
		{ name, address, phone_number, note, description }: UpdateCustomerDto,
	) {
		const customer = await this.customerRepository.findOne({
			where: { id },
		});

		if (!customer) {
			throw new HttpException(
				"Khách không tồn tại trong hệ thống",
				HttpStatus.BAD_REQUEST,
			);
		}

		await this.customerRepository.update(
			{ id },
			{ name, address, phone_number, description, note },
		);

		const newProductResult = await this.customerRepository.findOne({
			where: { id },
		});

		return newProductResult;
	}

	remove(id: string) {
		// TODO chưa xóa được
		return `This action removes a #${id} customer`;
	}
}
