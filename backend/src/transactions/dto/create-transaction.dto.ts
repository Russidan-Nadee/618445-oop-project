import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
   @IsInt()
   assetId: number;

   @IsInt()
   userId: number;

   @IsString()
   @IsOptional()
   note?: string;
}
