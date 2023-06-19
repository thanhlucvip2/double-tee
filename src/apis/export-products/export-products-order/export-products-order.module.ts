import { Module } from "@nestjs/common";
import { ExportProductsOrderService } from "./export-products-order.service";
import { ExportProductsOrderController } from "./export-products-order.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ExportProductsOrderEntity } from "./entities/export-products-order.entity";
import { CustomerEntity } from "@/apis/customer/entities/customer.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([ExportProductsOrderEntity, CustomerEntity]),
	],
	controllers: [ExportProductsOrderController],
	providers: [ExportProductsOrderService],
})
export class ExportProductsOrderModule {}
