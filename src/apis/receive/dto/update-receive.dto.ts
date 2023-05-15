import { IsNotEmpty, Length } from 'class-validator';

export class UpdateReceiveDto {
  @IsNotEmpty()
  quantity: number;

  @IsNotEmpty()
  fee_shipping: number;

  @IsNotEmpty()
  total_price: number;

  @IsNotEmpty()
  @Length(1, 20)
  sku: string;

  note?: string;

  status?: string;
}
