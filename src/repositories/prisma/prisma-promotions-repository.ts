import { Prisma } from "@/generated/prisma";
import { PromotionsRepository } from "../promotions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPromotionRepository implements PromotionsRepository {
    async create(data: Prisma.PromotionCreateInput) {
        const promotion = await prisma.promotion.create({
            data
        })

        return promotion
    }
}
