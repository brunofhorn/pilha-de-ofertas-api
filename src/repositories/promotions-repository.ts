import { Prisma, Promotion } from "@/generated/prisma";

export interface PromotionsRepository {
    getLast(): Promise<Promotion[] | []>;
    create(data: Prisma.PromotionCreateInput): Promise<Promotion>;
    searchMany(original_message: string, title: string, description: string): Promise<Promotion[] | null>;
    comparePromotion(id: number, title: string, description: string): Promise<boolean>;
    update(promotion: Partial<Promotion>): Promise<Promotion | null>;
    delete(id: number): Promise<void>;
    markAsSent(id: number): Promise<Promotion>;
}
