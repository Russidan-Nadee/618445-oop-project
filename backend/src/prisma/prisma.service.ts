import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
   constructor() {
      super(); // PrismaClient จะอ่าน DATABASE_URL ผ่าน prisma.config.ts
   }

   async onModuleInit() {
      await this.$connect();
   }

   async onModuleDestroy() {
      await this.$disconnect();
   }
}
