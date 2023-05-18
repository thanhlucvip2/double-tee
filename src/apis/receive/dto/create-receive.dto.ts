import { IsNotEmpty } from 'class-validator';

export class CreateReceiveDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  fee_shipping: number;

  @IsNotEmpty()
  products_type_id: string;

  @IsNotEmpty()
  supplier_id: string;

  @IsNotEmpty()
  total_price: number;

  note?: string;
}
