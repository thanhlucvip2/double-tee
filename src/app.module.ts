import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { SECRET } from "@/configs/app.config";
import { APP_FILTER } from "@nestjs/core";
import { HttpErrorFilter } from "@/systems/http-error.filter";

import { DatabaseModule, MailModule } from "@/modules";
import { UserModule } from "@/user/user.module";

import { ProductsTypeModule } from "@/apis/products-type/products-type.module";
import { SupplierModule } from "@/apis/supplier/supplier.module";
import { ImportProductsOrderModule } from "@/apis/import-products/import-products-order/import-products-order.module";
import { ImportProductsDetailModule } from "@/apis/import-products/import-products-detail/import-products-detail.module";
import { InventoryModule } from "@/apis/inventory/inventory.module";
import { ExportProductsOrderModule } from "@/apis/export-products/export-products-order/export-products-order.module";
import { ExportProductsDetailModule } from "@/apis/export-products/export-products-detail/export-products-detail.module";
import { CustomerModule } from "./apis/customer/customer.module";
@Module({
	imports: [
		DatabaseModule,
		MailModule,
		JwtModule.register({
			global: true,
			secret: SECRET,
			signOptions: { expiresIn: "1d" },
		}),
		UserModule,
		ProductsTypeModule,
		SupplierModule,
		ImportProductsOrderModule,
		ImportProductsDetailModule,
		InventoryModule,
		CustomerModule,
		ExportProductsOrderModule,
		ExportProductsDetailModule,
	],
	providers: [
		{
			provide: APP_FILTER,
			useClass: HttpErrorFilter,
		},
	],
})
export class AppModule {}
