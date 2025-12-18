import { Module } from '@nestjs/common';
import { AssetTypeController } from './asset-type.controller';
import { AssetTypeService } from './asset-type.service';

@Module({
   controllers: [AssetTypeController],
   providers: [AssetTypeService],
})
export class AssetTypeModule { }
