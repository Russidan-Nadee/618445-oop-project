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

   // GET STATS (ต้องอยู่ก่อน :id)
   @Get('stats')
   async getAssetStats() {
      return this.assetsService.getAssetStats();
   }

   // READ BY TYPE (ต้องอยู่ก่อน :id)
   @Get('type/:typeId')
   findByType(@Param('typeId', ParseIntPipe) typeId: number) {
      return this.assetsService.findByType(typeId)
   }

   // READ ONE (ต้องอยู่ท้ายสุด)
   @Get(':id')
   findOne(@Param('id', ParseIntPipe) id: number) {
      return this.assetsService.findOne(id)
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