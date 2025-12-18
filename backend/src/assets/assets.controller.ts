import {
   Controller,
   Post,
   Get,
   Patch,
   Delete,
   Param,
   Body,
   ParseIntPipe,
} from '@nestjs/common'
import { AssetsService } from './assets.service'
import { CreateAssetDto } from './dto/create-asset.dto'
import { UpdateAssetDto } from './dto/update-asset.dto'

@Controller('assets')
export class AssetsController {
   constructor(private readonly assetsService: AssetsService) { }

   // CREATE
   @Post()
   create(@Body() dto: CreateAssetDto) {
      return this.assetsService.create(dto)
   }

   // READ ALL
   @Get()
   findAll() {
      return this.assetsService.findAll()
   }

   // READ ONE
   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.assetsService.findOne(id)
   }

   // READ BY TYPE
   @Get('type/:typeId')
   findByType(@Param('typeId', ParseIntPipe) typeId: number) {
      return this.assetsService.findByType(typeId)
   }

   // UPDATE
   @Patch(':id')
   update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateAssetDto,
   ) {
      return this.assetsService.update(id, dto)
   }

   // DELETE
   @Delete(':id')
   remove(@Param('id', ParseIntPipe) id: number) {
      return this.assetsService.remove(id)
   }
}
