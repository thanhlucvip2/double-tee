import { IsNotEmpty, Length } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  supplier_code: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Length(8, 11)
  phone_number: string;

  description?: string;
  note?: string;
}
