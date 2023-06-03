import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateImportProductsDetailDto {
  @IsNotEmpty()
  sku: string;

  @IsNotEmpty()
  size: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  @IsNumber()
  price: number;

  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  down_price: number;

  @IsNotEmpty()
  import_product_order_id: string;

  note?: string;
}
