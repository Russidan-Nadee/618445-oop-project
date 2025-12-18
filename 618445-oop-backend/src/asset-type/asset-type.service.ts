import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';

@Injectable()
export class AssetTypeService {
   constructor(private readonly prisma: PrismaService) { }

   create(createAssetTypeDto: CreateAssetTypeDto) {
      return this.prisma.assetType.create({
         data: {
            name: createAssetTypeDto.name,
         },
      });
   }
}
