import { IsNotEmpty } from 'class-validator';

export class UpdateProductsTypeDto {
  @IsNotEmpty()
  name: string;

  note?: string;
}
