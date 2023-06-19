import { Controller, Post, Body } from "@nestjs/common";
import { ExportProductsDetailService } from "./export-products-detail.service";
import { CreateExportProductsDetailDto } from "./dto/create-export-products-detail.dto";

@Controller("export-products-detail")
export class ExportProductsDetailController {
	constructor(
		private readonly exportProductsDetailService: ExportProductsDetailService,
	) {}

	@Post()
	create(@Body() createExportProductsDetailDto: CreateExportProductsDetailDto) {
		return this.exportProductsDetailService.create(
			createExportProductsDetailDto,
		);
	}
}
