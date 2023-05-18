import { IsNotEmpty } from 'class-validator';

export class UpdateReceiveDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  fee_shipping: number;

  @IsNotEmpty()
  total_price: number;

  note?: string;
}
