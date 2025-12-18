// src/user/dto/update-user.dto.ts
import { PartialType } from '@nestjs/mapped-types'
import { CreateUserDto } from './create-user.dto'
import { Role } from '@prisma/client'
import { IsEnum, IsOptional } from 'class-validator'

export class UpdateUserDto extends PartialType(CreateUserDto) {
   @IsOptional()
   @IsEnum(Role)
   role?: Role
}
