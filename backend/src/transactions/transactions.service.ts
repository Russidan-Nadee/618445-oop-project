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
