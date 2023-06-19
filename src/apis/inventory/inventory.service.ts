import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { InventoryEntity } from "./entities/inventory.entity";
import { EntityManager, Repository } from "typeorm";
import { PaginationDto } from "@/shared/pagination.dto";
import { ResponsePagination } from "@/shared/response.pagination";
import { CreateInventoryDto } from "./dto/create-inventory.dto";

@Injectable()
export class InventoryService {
	constructor(
		@InjectRepository(InventoryEntity)
		private readonly inventoryRepository: Repository<InventoryEntity>,
		private entityManager: EntityManager,
	) {}

	async findAll(pagination: PaginationDto) {
		const {
			// fromDate = new Date(),
			// toDate = new Date(),
			pageIndex = 0,
			pageSize = 10,
		} = pagination;

		// const sqlFromDate = convertDateTimeToDateString(fromDate);
		// const sqlToDate = convertDateTimeToDateString(adddate(toDate, 1)); // tặng thêm 1 ngày cho date hiện tại

		const [inventory, inventoryCount] =
			await this.inventoryRepository.findAndCount({
				skip: pageIndex * pageSize,
				take: pageSize,
			});

		const result = new ResponsePagination<InventoryEntity>({
			pageIndex: +pageIndex,
			pageSize: +pageSize,
			total: inventoryCount,
			data: inventory,
		});
		return result;
	}

	async findOne(id: string) {
		const inventoryById = await this.inventoryRepository.findOne({
			where: {
				id,
			},
			relations: ["products_type"],
		});
		if (!inventoryById) {
			throw new HttpException(
				"Mã hàng không tồn tại trong tồn kho",
				HttpStatus.BAD_REQUEST,
			);
		}
		return inventoryById;
	}

	async createInventory(data: CreateInventoryDto[]) {
		const promise = [];
		for (let i = 0; i < data.length; i++) {
			promise.push(this.createInventoryData(data[i]));
		}
		return await Promise.all(promise);
	}

	async createInventoryData(dataInventory: CreateInventoryDto) {
		const checkInventory = await this.inventoryRepository.findOne({
			where: {
				sku: dataInventory.sku,
				size: dataInventory.size,
				color: dataInventory.color,
			},
		});

		if (!checkInventory) {
			const newInventory = await this.inventoryRepository.create({
				quantity: dataInventory.quantity,
				sku: dataInventory.sku,
				size: dataInventory.size,
				color: dataInventory.color,
			});
			await this.inventoryRepository.save(newInventory);
		} else {
			await this.inventoryRepository.update(
				{
					sku: dataInventory.sku,
					size: dataInventory.size,
					color: dataInventory.color,
				},
				{
					quantity: checkInventory.quantity + dataInventory.quantity,
				},
			);
		}
		return await this.inventoryRepository.findOne({
			where: {
				sku: dataInventory.sku,
				size: dataInventory.size,
				color: dataInventory.color,
			},
		});
	}
}
