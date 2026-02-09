import { Prisma, Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "../promotions-repository";
import { prisma } from "@/lib/prisma";

export class PrismaPromotionRepository implements PromotionsRepository {
  async findByOriginalMessage(originalMessage: string) {
    const promotion = await prisma.promotion.findFirst({
      where: { original_message: originalMessage },
    });

    return promotion;
  }

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
      where: {
        AND: [
          { id: { equals: id } },
          { title: { contains: title } },
          { description: { contains: description } },
        ],
      },
    });

    return !!existing;
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

  async searchMany(
    original_message?: string,
    title?: string,
    description?: string
  ) {
    const filters: Prisma.PromotionWhereInput[] = [];

    if (original_message?.trim()) {
      filters.push({
        original_message: {
          contains: original_message,
          mode: Prisma.QueryMode.insensitive,
        },
      });
    }

    if (title?.trim()) {
      filters.push({
        AND: [
          { title: { not: null } },
          { title: { contains: title, mode: Prisma.QueryMode.insensitive } },
        ],
      });
    }

    if (description?.trim()) {
      filters.push({
        AND: [
          { description: { not: null } },
          {
            description: {
              contains: description,
              mode: Prisma.QueryMode.insensitive,
            },
          },
        ],
      });
    }

    const promotions = await prisma.promotion.findMany({
      where: filters.length > 0 ? { OR: filters } : undefined,
      orderBy: { created_at: "desc" },
    });

    return promotions;
  }
}
