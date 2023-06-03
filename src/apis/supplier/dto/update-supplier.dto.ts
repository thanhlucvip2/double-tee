import { IsNotEmpty, Length } from 'class-validator';

export class UpdateSupplierDto {
  name: string;
  address: string;
  phone_number: string;
  description?: string;
  note?: string;
}
