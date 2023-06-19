import { Module } from "@nestjs/common";
import { ImportProductsDetailService } from "./import-products-detail.service";
import { ImportProductsDetailController } from "./import-products-detail.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ImportProductsDetailEntity } from "./entities/import-products-detail.entity";
import { ProductsTypeEntity } from "@/apis/products-type/entities/products-type.entity";
import { ImportProductsOrderEntity } from "../import-products-order/entities/import-products-order.entity";

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ImportProductsDetailEntity,
			ProductsTypeEntity,
			ImportProductsOrderEntity,
		]),
	],
	controllers: [ImportProductsDetailController],
	providers: [ImportProductsDetailService],
})
export class ImportProductsDetailModule {}
