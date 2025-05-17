import { Prisma, Promotion } from "@/generated/prisma";

export interface PromotionsRepository {
    getLast(): Promise<Promotion[] | []>;
    comparePromotion(id: number, title: string, description: string): Promise<boolean>;
    create(data: Prisma.PromotionCreateInput): Promise<Promotion>;
    update(promotion: Partial<Promotion>): Promise<Promotion | null>;
    delete(id: number): Promise<void>;
    markAsSent(id: number): Promise<Promotion>;
    searchMany(query: string): Promise<Promotion[] | null>;
}
