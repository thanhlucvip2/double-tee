import { IsNotEmpty } from 'class-validator';

export class CreateProductsTypeDto {
  @IsNotEmpty()
  name: string;

  note?: string;
}
