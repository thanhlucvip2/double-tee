import { IsNotEmpty, Length } from 'class-validator';

export class UpdateProductsTypeDto {
  @Length(1, 20)
  sku: string;

  @IsNotEmpty()
  color: string;

  note?: string;
}
