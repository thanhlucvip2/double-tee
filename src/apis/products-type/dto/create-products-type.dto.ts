import { IsNotEmpty, Length } from 'class-validator';

export class CreateProductsTypeDto {
  @IsNotEmpty()
  @Length(1, 20)
  sku: string;

  @IsNotEmpty()
  color: string;

  @IsNotEmpty()
  name: string;

  note?: string;
}
