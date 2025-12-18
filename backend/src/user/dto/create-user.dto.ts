// src/user/dto/create-user.dto.ts
import { Role } from '@prisma/client'
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
   @IsNotEmpty()
   fullName: string

   @IsEmail()
   email: string

   @IsEnum(Role)
   role?: Role // default = USER
}
