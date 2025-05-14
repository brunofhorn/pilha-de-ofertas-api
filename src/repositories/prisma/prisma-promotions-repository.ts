import { Prisma } from "@/generated/prisma";
import { PromotionsRepository } from "../promotions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPromotionRepository implements PromotionsRepository {
    async create(data: Prisma.PromotionCreateInput) {
        const promotion = await prisma.promotion.create({
            data,
        });

        return promotion;
    }

    async send(id: number) {
        const promotion = await prisma.promotion.update({
            where: { id },
            data: {
                send_date: new Date(),
                updated_at: new Date(),
            },
        });

        return promotion;
    }

    async searchMany(query: string, page: number) {
        const promotions = await prisma.promotion.findMany({
            where: {
                OR: [
                    { original_message: { contains: query, mode: "insensitive" } },
                    { title: { contains: query, mode: "insensitive" } },
                    { description: { contains: query, mode: "insensitive" } },
                ],
            },
            take: 20,
            skip: (page - 1) * 20,
            orderBy: {
                created_at: "desc",
            },
        });

        return promotions;
    }
}
