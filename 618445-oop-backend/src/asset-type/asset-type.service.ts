import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';

@Injectable()
export class AssetTypeService {
   constructor(private readonly prisma: PrismaService) { }

   // CREATE
   create(createAssetTypeDto: CreateAssetTypeDto) {
      return this.prisma.assetType.create({
         data: {
            name: createAssetTypeDto.name,
         },
      });
   }

   // GET ALL
   findAll() {
      return this.prisma.assetType.findMany();
   }

   // GET BY ID
   findOne(id: number) {
      return this.prisma.assetType.findUnique({
         where: { id },
      });
   }

   // UPDATE
   update(id: number, name: string) {
      return this.prisma.assetType.update({
         where: { id },
         data: { name },
      });
   }

   // DELETE
   remove(id: number) {
      return this.prisma.assetType.delete({
         where: { id },
      });
   }
}
