import { Controller, Post, Get, Delete, Patch, Param, Body } from '@nestjs/common';

import { AssetTypeService } from './asset-type.service';
import { CreateAssetTypeDto } from './dto/create-asset-type.dto';

@Controller('asset-types')
export class AssetTypeController {
   constructor(private readonly assetTypeService: AssetTypeService) { }

   // CREATE
   @Post()
   create(@Body() createAssetTypeDto: CreateAssetTypeDto) {
      return this.assetTypeService.create(createAssetTypeDto);
   }

   // GET ALL
   @Get()
   findAll() {
      return this.assetTypeService.findAll();
   }

   // GET BY ID
   @Get(':id')
   findOne(@Param('id') id: string) {
      return this.assetTypeService.findOne(Number(id));
   }

   //UPDATE
   @Patch(':id')
   update(
      @Param('id') id: string,
      @Body() body: { name: string },
   ) {
      return this.assetTypeService.update(Number(id), body.name);
   }

   // DELETE
   @Delete(':id')
   remove(@Param('id') id: string) {
      return this.assetTypeService.remove(Number(id));
   }
}
