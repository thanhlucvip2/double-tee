import {
	Controller,
	Post,
	Body,
	UseGuards,
	Query,
	Get,
	Param,
} from "@nestjs/common";
import { ExportProductsOrderService } from "./export-products-order.service";
import { CreateExportProductsOrderDto } from "./dto/create-export-products-order.dto";
import { AuthGuard } from "@/guard/auth.guard";
import { AdminRoleGuard } from "@/guard/admin_role.guard";
import { PaginationDto } from "@/shared/pagination.dto";

@UseGuards(AuthGuard, AdminRoleGuard)
@Controller("export-products-order")
export class ExportProductsOrderController {
	constructor(
		private readonly exportProductsOrderService: ExportProductsOrderService,
	) {}

	@Get()
	@UseGuards(AuthGuard, AdminRoleGuard)
	async findAll(@Query() pagination: PaginationDto) {
		return this.exportProductsOrderService.findAll(pagination);
	}

	@Get(":id")
	@UseGuards(AuthGuard, AdminRoleGuard)
	findOne(@Param("id") id: string) {
		return this.exportProductsOrderService.findOne(id);
	}

	@Post()
	async create(
		@Body() createExportProductsOrderDto: CreateExportProductsOrderDto,
	) {
		return this.exportProductsOrderService.create(createExportProductsOrderDto);
	}
}
