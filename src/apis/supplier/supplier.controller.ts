import {
	Controller,
	Get,
	Post,
	Body,
	Param,
	Delete,
	UseGuards,
	Put,
	Query,
} from "@nestjs/common";
import { SupplierService } from "./supplier.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { AuthGuard } from "@/guard/auth.guard";
import { AdminRoleGuard } from "@/guard/admin_role.guard";
import { PaginationDto } from "@/shared/pagination.dto";
@UseGuards(AuthGuard, AdminRoleGuard)
@Controller("supplier")
export class SupplierController {
	constructor(private readonly supplierService: SupplierService) {}

	@Post()
	create(@Body() createSupplierDto: CreateSupplierDto) {
		return this.supplierService.create(createSupplierDto);
	}

	@Get()
	findAll(@Query() pagination: PaginationDto) {
		return this.supplierService.findAll(pagination);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.supplierService.findOne(id);
	}

	@Put(":id")
	update(
		@Param("id") id: string,
		@Body() updateSupplierDto: UpdateSupplierDto,
	) {
		return this.supplierService.update(id, updateSupplierDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.supplierService.remove(id);
	}
}
