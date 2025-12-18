import { IsOptional, IsString, IsInt, IsEnum, IsDateString } from 'class-validator'
import { AssetStatus } from '@prisma/client'

export class UpdateAssetDto {
   @IsOptional()
   @IsString()
   name?: string

   @IsOptional()
   @IsString()
   serialNumber?: string

   @IsOptional()
   @IsDateString()
   purchaseDate?: string

   @IsOptional()
   @IsEnum(AssetStatus)
   status?: AssetStatus

   @IsOptional()
   @IsInt()
   typeId?: number
}
