import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
   constructor(private readonly prisma: PrismaService) { }

   async borrow(dto: CreateTransactionDto) {
      const asset = await this.prisma.asset.findUnique({
         where: { id: dto.assetId },
      });

      if (!asset) throw new NotFoundException('Asset not found');
      if (asset.status !== 'AVAILABLE')
         throw new BadRequestException('Asset is not available for borrowing');

      // update status
      await this.prisma.asset.update({
         where: { id: dto.assetId },
         data: { status: 'BORROWED' },
      });

      // create transaction
      const transaction = await this.prisma.transaction.create({
         data: {
            action: 'borrow',
            actionDate: new Date(),
            note: dto.note,
            userId: dto.userId,
            assetId: dto.assetId,
         },
      });

      return transaction;
   }

   async return(dto: CreateTransactionDto) {
      const asset = await this.prisma.asset.findUnique({
         where: { id: dto.assetId },
      });

      if (!asset) throw new NotFoundException('Asset not found');
      if (asset.status !== 'BORROWED')
         throw new BadRequestException('Asset is not currently borrowed');

      // update status
      await this.prisma.asset.update({
         where: { id: dto.assetId },
         data: { status: 'AVAILABLE' },
      });

      // create transaction
      const transaction = await this.prisma.transaction.create({
         data: {
            action: 'return',
            actionDate: new Date(),
            note: dto.note,
            userId: dto.userId,
            assetId: dto.assetId,
         },
      });

      return transaction;
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
      });
   }

   //GET TRANSACTION BY USER ID
   async findByUserId(userId: number) {
      const userExists = await this.prisma.user.findUnique({
         where: { id: userId },
      });
      if (!userExists) throw new NotFoundException('User not found');

      return this.prisma.transaction.findMany({
         where: { userId },
         include: {
            user: true,
            asset: true,
         },
         orderBy: {
            actionDate: 'desc',
         },
      });
   }
   /// GET TRANSACTION BY ASSET ID
   async findByAssetId(assetId: number) {
      const assetExists = await this.prisma.asset.findUnique({
         where: { id: assetId },
      });

      if (!assetExists) {
         throw new NotFoundException('Asset not found');
      }

      return this.prisma.transaction.findMany({
         where: { assetId },
         include: {
            user: true,
            asset: true,
         },
         orderBy: {
            actionDate: 'desc',
         },
      });
   }
}
