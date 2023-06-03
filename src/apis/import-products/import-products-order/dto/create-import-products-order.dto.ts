import { IsNotEmpty } from 'class-validator';

export class CreateImportProductsOrderDto {
  @IsNotEmpty()
  supplier_code: string;

  note?: string;
}
