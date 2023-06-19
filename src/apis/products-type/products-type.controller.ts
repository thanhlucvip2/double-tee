import {
	Controller,
	Get,
	Post,
	Body,
	Put,
	Param,
	Delete,
	Query,
} from "@nestjs/common";
import { ProductsTypeService } from "./products-type.service";
import { CreateProductsTypeDto } from "./dto/create-products-type.dto";
import { UseGuards } from "@nestjs/common";
import { AuthGuard } from "@/guard/auth.guard";
import { AdminRoleGuard } from "@/guard/admin_role.guard";
import { PaginationDto } from "@/shared/pagination.dto";
import { UpdateProductsTypeDto } from "./dto/update-products-type.dto";

@Controller("products-type")
export class ProductsTypeController {
	constructor(private readonly productsTypeService: ProductsTypeService) {}

	@Post()
	@UseGuards(AuthGuard, AdminRoleGuard)
	async create(@Body() createProductsTypeDto: CreateProductsTypeDto) {
		return this.productsTypeService.create(createProductsTypeDto);
	}

	@Get(":id")
	@UseGuards(AuthGuard)
	findOne(@Param("id") id: string) {
		return this.productsTypeService.findOne(id);
	}

	@Get()
	@UseGuards(AuthGuard)
	findAll(@Query() pagination: PaginationDto) {
		return this.productsTypeService.findAll(pagination);
	}

	@Put(":id")
	@UseGuards(AuthGuard, AdminRoleGuard)
	update(
		@Param("id") id: string,
		@Body() updateProductsTypeDto: UpdateProductsTypeDto,
	) {
		return this.productsTypeService.update(id, updateProductsTypeDto);
	}

	@Delete(":id")
	@UseGuards(AuthGuard, AdminRoleGuard)
	remove(@Param("id") id: string) {
		return this.productsTypeService.remove(id);
	}
}
