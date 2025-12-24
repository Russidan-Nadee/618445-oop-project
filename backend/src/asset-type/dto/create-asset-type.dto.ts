import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAssetTypeDto {
   @IsString()
   @IsNotEmpty()
   name: string;
}
