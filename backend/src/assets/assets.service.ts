import { Injectable, NotFoundException } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { CreateAssetDto } from './dto/create-asset.dto'
import { UpdateAssetDto } from './dto/update-asset.dto'

@Injectable()
export class AssetsService {
   constructor(private readonly prisma: PrismaService) { }

   // CREATE
   async create(dto: CreateAssetDto) {
      return this.prisma.asset.create({
         data: {
            name: dto.name,
            serialNumber: dto.serialNumber,
            purchaseDate: new Date(dto.purchaseDate),
            typeId: dto.typeId,
         },
      })
   }


   // READ ALL
   async findAll() {
      return this.prisma.asset.findMany({
         include: {
            type: true,
         },
      })
   }

   // GET STATS
   async getAssetStats() {
      const [total, statusCounts] = await Promise.all([
         this.prisma.asset.count(),
         this.prisma.asset.groupBy({
            by: ['status'],
            _count: { id: true },
         }),
      ]);

      const stats = statusCounts.reduce((acc, curr) => {
         acc[curr.status] = curr._count.id;
         return acc;
      }, {} as Record<string, number>);

      return {
         total,
         available: stats.AVAILABLE || 0,
         borrowed: stats.BORROWED || 0,
         brokenDisabled: (stats.BROKEN || 0) + (stats.DISABLED || 0),
      };
   }

   // READ ONE
   async findOne(id: number) {
      const asset = await this.prisma.asset.findUnique({
         where: { id },
         include: { type: true },
      })

      if (!asset) {
         throw new NotFoundException('Asset not found')
      }

      return asset
   }

   // READ BY TYPE
   async findByType(typeId: number) {
      return this.prisma.asset.findMany({
         where: { typeId },
         include: { type: true },
      })
   }

   // UPDATE
   async update(id: number, dto: UpdateAssetDto) {
      await this.findOne(id) // เช็คว่ามีจริง

      return this.prisma.asset.update({
         where: { id },
         data: {
            name: dto.name,
            serialNumber: dto.serialNumber,
            purchaseDate: dto.purchaseDate,
            status: dto.status,
            typeId: dto.typeId,
         },
      })
   }

   // DELETE
   async remove(id: number) {
      await this.findOne(id)

      return this.prisma.asset.delete({
         where: { id },
      })
   }


}
