import { IsNotEmpty, IsNumber } from 'class-validator';

export class PaymentOrderDto {
  @IsNotEmpty()
  @IsNumber()
  fee_ship: number;

  @IsNotEmpty()
  @IsNumber()
  down_price: number;

  @IsNotEmpty()
  @IsNumber()
  payment_success: number;

  @IsNotEmpty()
  import_product_order_id: string;
}
