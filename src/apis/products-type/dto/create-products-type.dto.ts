import { IsNotEmpty } from 'class-validator';

export class CreateProductsTypeDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  sku: string;

  description?: string;

  note?: string;
}
