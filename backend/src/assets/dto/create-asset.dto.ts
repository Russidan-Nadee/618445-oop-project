import { IsString, IsInt, IsDateString } from 'class-validator'

export class CreateAssetDto {
   @IsString()
   name: string

   @IsString()
   serialNumber: string

   @IsDateString()
   purchaseDate: string

   @IsInt()
   typeId: number
}
