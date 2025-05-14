import { Prisma, Promotion } from "@/generated/prisma";

export interface PromotionsRepository {
    create(data: Prisma.PromotionCreateInput): Promise<Promotion>;
    send(id: number): Promise<Promotion>
    searchMany(query: string, page: number): Promise<Promotion[] | null>
}
