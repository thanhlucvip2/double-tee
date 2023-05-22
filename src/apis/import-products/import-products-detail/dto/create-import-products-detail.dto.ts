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
  price: string;

  @IsNotEmpty()
  @IsNumber()
  quantity: string;

  @IsNotEmpty()
  @IsNumber()
  total_price: string;

  down_price: string;

  @IsNotEmpty()
  products_type_id: string;

  @IsNotEmpty()
  import_product_order_id: string;
}
