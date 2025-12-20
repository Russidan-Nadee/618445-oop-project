import { Module } from '@nestjs/common'
import { LogController } from './log.controller'
import { LogService } from './log.service'
import { PrismaService } from '../prisma/prisma.service'

@Module({
   controllers: [LogController],
   providers: [LogService, PrismaService],
   exports: [LogService], // ให้ module อื่นเรียกใช้ createLog ได้
})
export class LogModule { }
