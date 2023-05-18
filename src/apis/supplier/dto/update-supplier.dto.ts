import { IsNotEmpty, Length } from 'class-validator';

export class UpdateSupplierDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  address: string;

  @IsNotEmpty()
  @Length(8, 11)
  phone_number: string;

  note?: string;
}
