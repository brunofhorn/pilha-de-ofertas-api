import { Prisma, Promotion } from "@/generated/prisma";

export interface PromotionsRepository {
    create(data: Prisma.PromotionCreateInput): Promise<Promotion>;
}
