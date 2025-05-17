import { Prisma, Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "../promotions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPromotionRepository implements PromotionsRepository {
    async getLast() {
        const lastPromotions = await prisma.promotion.findMany({
            where: { send_date: null },
            take: 10,
        });

        if (!lastPromotions) return [];

        return lastPromotions;
    }

    async comparePromotion(id: number, title: string, description: string) {
        const existing = await prisma.promotion.findFirst({
            where: { id, title, description },
        });

        return !existing;
    }

    async update(promotion: Promotion) {
        if (!promotion.id) return null;

        const updatedPromotion = await prisma.promotion.update({
            where: { id: promotion.id },
            data: { ...promotion, updated_at: new Date() },
        });

        return updatedPromotion;
    }

    async delete(id: number) {
        await prisma.promotion.delete({ where: { id } });
    }


    async create(data: Prisma.PromotionCreateInput) {
        const promotion = await prisma.promotion.create({
            data,
        });

        return promotion;
    }

    async markAsSent(id: number) {
        const promotion = await prisma.promotion.update({
            where: { id },
            data: {
                send_date: new Date(),
                updated_at: new Date(),
            },
        });

        return promotion;
    }

    async searchMany(query: string) {
        const promotions = await prisma.promotion.findMany({
            where: {
                OR: [
                    { original_message: { contains: query, mode: "insensitive" } },
                    { title: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ],
            },
            orderBy: {
                created_at: "desc",
            },
        });

        return promotions;
    }
}
