import { Controller, Post, Body } from '@nestjs/common';
import { AssetTypeService } from './asset-type.service';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';

@Controller('asset-types')
export class AssetTypeController {
   constructor(private readonly assetTypeService: AssetTypeService) { }

   @Post()
   create(@Body() createAssetTypeDto: CreateAssetTypeDto) {
      return this.assetTypeService.create(createAssetTypeDto);
   }
}
