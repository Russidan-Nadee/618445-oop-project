
import { Body, Controller, Get, Param, Post, ParseIntPipe, Query } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Controller('transactions')
export class TransactionsController {
   constructor(private readonly transactionsService: TransactionsService) { }

   @Post('borrow')
   borrow(@Body() dto: CreateTransactionDto) {
      return this.transactionsService.borrow(dto);
   }

   @Post('return')
   return(@Body() dto: CreateTransactionDto) {
      return this.transactionsService.return(dto);
   }

   // GET ALL TRANSACTIONS
   @Get()
   findAll() {
      return this.transactionsService.findAll();
   }

   @Get('trend')
   async getTrend(@Query('days') days: string) {
      // แปลง string จาก query เป็น number และกำหนดค่าเริ่มต้นเป็น 30 วัน
      const period = parseInt(days) || 30;
      return this.transactionsService.getTrend(period);

   }
   //GET TRANSACTION BY USER ID
   @Get('user/:id')
   findByUserId(
      @Param('id', ParseIntPipe) id: number,
   ) {
      return this.transactionsService.findByUserId(id);
   }

   //GET TRANSACTION BY ASSET ID
   @Get('asset/:id')
   findByAssetId(
      @Param('id', ParseIntPipe) id: number,
   ) {
      return this.transactionsService.findByAssetId(id);
   }
}
