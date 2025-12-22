import {
   Injectable,
   BadRequestException,
   NotFoundException,
} from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateTransactionDto } from './dto/create-transaction.dto'
import { LogService } from '../log/log.service'

@Injectable()
export class TransactionsService {
   constructor(
      private readonly prisma: PrismaService,
      private readonly logService: LogService,
   ) { }

   async borrow(dto: CreateTransactionDto) {
      return this.prisma.$transaction(async (tx) => {
         const asset = await tx.asset.findUnique({
            where: { id: dto.assetId },
         })

         if (!asset) throw new NotFoundException('Asset not found')
         if (asset.status !== 'AVAILABLE') {
            throw new BadRequestException('Asset is not available for borrowing')
         }

         // 1. update asset status
         await tx.asset.update({
            where: { id: dto.assetId },
            data: { status: 'BORROWED' },
         })

         // 2. create transaction
         const transaction = await tx.transaction.create({
            data: {
               action: 'borrow',
               actionDate: new Date(),
               note: dto.note,
               userId: dto.userId,
               assetId: dto.assetId,
            },
         })

         // 3. create log (ยืม)
         await this.logService.createLog(
            dto.userId,
            'BORROW_ASSET',
            dto.assetId,
         )

         return transaction
      })
   }

   async return(dto: CreateTransactionDto) {
      return this.prisma.$transaction(async (tx) => {
         const asset = await tx.asset.findUnique({
            where: { id: dto.assetId },
         })

         if (!asset) throw new NotFoundException('Asset not found')
         if (asset.status !== 'BORROWED') {
            throw new BadRequestException('Asset is not currently borrowed')
         }

         // 1. update asset status
         await tx.asset.update({
            where: { id: dto.assetId },
            data: { status: 'AVAILABLE' },
         })

         // 2. create transaction
         const transaction = await tx.transaction.create({
            data: {
               action: 'return',
               actionDate: new Date(),
               note: dto.note,
               userId: dto.userId,
               assetId: dto.assetId,
            },
         })

         // 3. create log (คืน)
         await this.logService.createLog(
            dto.userId,
            'RETURN_ASSET',
            dto.assetId,
         )

         return transaction
      })
   }

   // GET ALL TRANSACTIONS
   async findAll() {
      return this.prisma.transaction.findMany({
         include: {
            user: true,
            asset: true,
         },
         orderBy: {
            actionDate: 'desc',
         },
      })
   }

   // GET TRANSACTION TREND
   async getTrend(days: number) {
      // 1. กำหนดช่วงเวลาเริ่มต้น (ย้อนหลังไปตามจำนวนวันที่ระบุ)
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - (days - 1));
      startDate.setHours(0, 0, 0, 0); // เริ่มต้นที่เวลา 00:00 ของวันแรก

      // 2. ดึงข้อมูลจาก Database เฉพาะช่วงวันที่ต้องการ
      const transactions = await this.prisma.transaction.findMany({
         where: {
            actionDate: {
               gte: startDate,
            },
         },
         select: {
            action: true,      // ดูว่าเป็น 'borrow' หรือ 'return'
            actionDate: true,  // ดูว่าเกิดวันที่เท่าไหร่
         },
      });

      // 3. เตรียม Map สำหรับเก็บข้อมูลรายวัน (ป้องกันกราฟแหว่งในวันที่ไม่มี Transaction)
      const trendMap = new Map<string, { date: string; borrowed: number; returned: number }>();

      for (let i = 0; i < days; i++) {
         const d = new Date(startDate);
         d.setDate(d.getDate() + i);
         const dateStr = d.toISOString().split('T')[0]; // format: "YYYY-MM-DD"
         trendMap.set(dateStr, {
            date: dateStr,
            borrowed: 0,
            returned: 0,
         });
      }

      // 4. นำข้อมูลจาก DB มานับจำนวนลงใน Map
      transactions.forEach((tx) => {
         const dateStr = tx.actionDate.toISOString().split('T')[0];
         const dayData = trendMap.get(dateStr);

         if (dayData) {
            if (tx.action === 'borrow') {
               dayData.borrowed += 1;
            } else if (tx.action === 'return') {
               dayData.returned += 1;
            }
         }
      });

      // 5. แปลง Map กลับเป็น Array และเรียงลำดับวันที่จากเก่าไปใหม่
      return Array.from(trendMap.values()).sort((a, b) =>
         a.date.localeCompare(b.date)
      );
   }

   // GET TRANSACTION BY USER ID
   async findByUserId(userId: number) {
      const userExists = await this.prisma.user.findUnique({
         where: { id: userId },
      })

      if (!userExists) throw new NotFoundException('User not found')

      return this.prisma.transaction.findMany({
         where: { userId },
         include: {
            user: true,
            asset: true,
         },
         orderBy: {
            actionDate: 'desc',
         },
      })
   }

   // GET TRANSACTION BY ASSET ID
   async findByAssetId(assetId: number) {
      const assetExists = await this.prisma.asset.findUnique({
         where: { id: assetId },
      })

      if (!assetExists) throw new NotFoundException('Asset not found')

      return this.prisma.transaction.findMany({
         where: { assetId },
         include: {
            user: true,
            asset: true,
         },
         orderBy: {
            actionDate: 'desc',
         },
      })
   }
}
