import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { AssetTypeModule } from './asset-type/asset-type.module'

@Module({
  imports: [
    AssetTypeModule, 
    PrismaModule],
})
export class AppModule { }
