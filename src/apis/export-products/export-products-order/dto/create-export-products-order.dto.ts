import { IsNotEmpty } from 'class-validator';

export class CreateExportProductsOrderDto {
  @IsNotEmpty()
  customer_code: string;

  note?: string;
}
