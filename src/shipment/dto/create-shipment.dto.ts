import { IsNotEmpty, IsPositive, IsString, MaxLength } from 'class-validator';
import { Facility } from 'generated/prisma/enums';

export class CreateShipmentDto {
  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  senderName: string;

  @IsString()
  @IsNotEmpty()
  senderFacility: Facility;

  @IsString()
  @MaxLength(20)
  @IsNotEmpty()
  recipientName: string;

  @IsString()
  @IsNotEmpty()
  recipientFacility: Facility;

  @IsNotEmpty()
  @IsPositive()
  weight: number; // kilogram weight
}
