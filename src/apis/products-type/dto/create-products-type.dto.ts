import { IS_ALPHA, IsNotEmpty, Length } from 'class-validator';

export class CreateProductsTypeDto {
  @IsNotEmpty()
  @Length(1, 20)
  sku: string;

  @IsNotEmpty()
  @Length(1, 1)
  size: string;

  @IsNotEmpty()
  color: string;

  note?: string;
}
