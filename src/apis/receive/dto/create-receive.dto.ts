import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReceiveDto {
  note?: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;

  @IsNotEmpty()
  @IsNumber()
  fee_shipping: number;

  @IsNotEmpty()
  @IsNumber()
  total_price: number;
}
