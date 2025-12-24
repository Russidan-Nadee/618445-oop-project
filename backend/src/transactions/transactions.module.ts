import { Module } from '@nestjs/common'
import { TransactionsController } from './transactions.controller'
import { TransactionsService } from './transactions.service'
import { PrismaModule } from '../prisma/prisma.module'
import { LogModule } from '../log/log.module'

@Module({
   imports: [
      PrismaModule,
      LogModule,
   ],
   controllers: [TransactionsController],
   providers: [TransactionsService],
})
export class TransactionsModule { }
