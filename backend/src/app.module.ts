import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AssetTypeModule } from './asset-type/asset-type.module'
import { UserModule } from './user/user.module'
import { AssetsModule } from './assets/assets.module'
import { TransactionsModule } from './transactions/transactions.module'
import { LogModule } from './log/log.module'
@Module({
  imports: [
    AssetTypeModule,
    PrismaModule,
    UserModule,
    AssetsModule,
    TransactionsModule,
    LogModule,],
})
export class AppModule { }
