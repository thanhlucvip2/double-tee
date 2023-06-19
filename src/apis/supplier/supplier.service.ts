import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { SupplierEntity } from "./entities/supplier.entity";
import { EntityManager, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { PaginationDto } from "@/shared/pagination.dto";
import { ResponsePagination } from "@/shared/response.pagination";

@Injectable()
export class SupplierService {
	constructor(
		@InjectRepository(SupplierEntity)
		private readonly supplierRepository: Repository<SupplierEntity>,
		private entityManager: EntityManager,
	) {}

	async create({
		supplier_code,
		name,
		address,
		phone_number,
		description,
		note,
	}: CreateSupplierDto) {
		const checkPhoneNumber = await this.supplierRepository.findOne({
			where: { phone_number },
		});
		if (checkPhoneNumber) {
			throw new HttpException(
				"Số điện thoại đã tồn tại trong hệ thống",
				HttpStatus.BAD_REQUEST,
			);
		}
		const checkSupplierCode = await this.supplierRepository.findOne({
			where: { supplier_code },
		});
		if (checkSupplierCode) {
			throw new HttpException(
				"Mã nhà cung cấp đã tồn tại trong hệ thống",
				HttpStatus.BAD_REQUEST,
			);
		}
		const newProduct = await this.supplierRepository.create({
			supplier_code,
			name,
			address,
			phone_number,
			description,
			note,
		});

		return await this.supplierRepository.save(newProduct);
	}

	async findAll(pagination: PaginationDto) {
		const { pageIndex = 0, pageSize = 10 } = pagination;
		const [supplier, supplierCount] =
			await this.supplierRepository.findAndCount({
				skip: pageIndex * pageSize,
				take: pageSize,
			});

		const result = new ResponsePagination<SupplierEntity>({
			pageIndex: +pageIndex,
			pageSize: +pageSize,
			total: supplierCount,
			data: supplier,
		});
		return result;
	}

	async findOne(id: string) {
		const productType = await this.supplierRepository.findOne({
			where: { id },
			relations: ["import_product_order"],
		});
		if (!productType) {
			throw new HttpException(
				"Nhà cung cấp hàng không tồn tại!",
				HttpStatus.BAD_REQUEST,
			);
		}
		return productType;
	}

	async update(
		id: string,
		{ name, address, phone_number, description, note }: UpdateSupplierDto,
	) {
		const supplier = await this.supplierRepository.findOne({
			where: { id },
		});

		if (!supplier) {
			throw new HttpException(
				"Nhà cung cấp không tồn tại trong hệ thống",
				HttpStatus.BAD_REQUEST,
			);
		}

		await this.supplierRepository.update(
			{ id },
			{ name, address, phone_number, description, note },
		);

		const newProductResult = await this.supplierRepository.findOne({
			where: { id },
			relations: ["import_product_order"],
		});
		return newProductResult;
	}

	async remove(id: string) {
		// TODO : chưa xóa được
		// const receive: SupplierEntity = await this.supplierRepository.findOne({
		//   where: { id },
		// });
		// if (!receive) {
		//   throw new HttpException(
		//     'Nhà cung cấp không tồn tại trong hệ thống',
		//     HttpStatus.BAD_REQUEST,
		//   );
		// }
		// await this.supplierRepository.delete({ id });
		// return {
		//   message: 'Xóa nhà cung cấp thành công',
		// };
	}
}
