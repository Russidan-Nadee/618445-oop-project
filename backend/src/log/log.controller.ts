import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common'
import { LogService } from './log.service'

@Controller('logs')
export class LogController {
   constructor(private readonly logService: LogService) { }

   // GET /logs

   @Get()
   findAll() {
      return this.logService.findAll()
   }

   //GET /logs/user/:userId

   @Get('user/:userId')
   findByUser(
      @Param('userId', ParseIntPipe) userId: number,
   ) {
      return this.logService.findByUser(userId)
   }

   // GET /logs/target/:targetId

   @Get('target/:targetId')
   findByTarget(
      @Param('targetId', ParseIntPipe) targetId: number,
   ) {
      return this.logService.findByTarget(targetId)
   }
}
