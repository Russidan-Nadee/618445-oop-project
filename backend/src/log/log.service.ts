import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class LogService {
   constructor(private prisma: PrismaService) { }

   /**
    * ใช้สำหรับสร้าง log จาก service อื่น
    * เช่น borrow / return / create asset / update asset
    */
   async createLog(
      userId: number,
      action: string,
      targetId: number,
   ) {
      return this.prisma.log.create({
         data: {
            userId,
            action,
            targetId,
         },
      })
   }

   /**
    * GET /logs
    * ดู log ทั้งหมดในระบบ
    */
   async findAll() {
      return this.prisma.log.findMany({
         orderBy: {
            timestamp: 'desc',
         },
         include: {
            user: {
               select: {
                  id: true,
                  fullName: true,
                  role: true,
               },
            },
         },
      })
   }

   /**
    * GET /logs/user/:userId
    * ดู log ตามผู้ใช้
    */
   async findByUser(userId: number) {
      return this.prisma.log.findMany({
         where: { userId },
         orderBy: {
            timestamp: 'desc',
         },
         include: {
            user: {
               select: {
                  id: true,
                  fullName: true,
                  role: true,
               },
            },
         },
      })
   }

   /**
    * GET /logs/target/:targetId
    * ดู log ตาม asset / entity ที่ถูกกระทำ
    */
   async findByTarget(targetId: number) {
      return this.prisma.log.findMany({
         where: { targetId },
         orderBy: {
            timestamp: 'desc',
         },
         include: {
            user: {
               select: {
                  id: true,
                  fullName: true,
                  role: true,
               },
            },
         },
      })
   }
}
