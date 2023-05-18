import { IsNotEmpty, Length } from 'class-validator';

export class CreateReceiveDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  fee_shipping: number;

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  @Length(1, 20)
  sku: string;

  @IsNotEmpty()
  @Length(1, 20)
  supplier_code: string;

  note?: string;
}
