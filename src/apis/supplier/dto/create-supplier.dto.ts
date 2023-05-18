import { IsNotEmpty, Length } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Length(8, 11)
  phone_number: string;

  @IsNotEmpty()
  @Length(1, 20)
  supplier_code: string;

  note?: string;
}
