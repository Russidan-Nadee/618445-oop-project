import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AssetTypeModule } from './asset-type/asset-type.module'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    AssetTypeModule,
    PrismaModule,
    UserModule],
})
export class AppModule { }
