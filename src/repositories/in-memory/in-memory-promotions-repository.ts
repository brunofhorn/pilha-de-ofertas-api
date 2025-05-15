import { Prisma, Promotion } from "@/generated/prisma";
import { PromotionsRepository } from "../promotions-repository";
import { randomInt } from "node:crypto";

export class InMemoryPromotionsRepository implements PromotionsRepository {
    public items: Promotion[] = [];

    async getLast() {
        return this.items.filter((item) => item.send_date === null);
    }

    async comparePromotion(id: number, title: string, description: string) {
        const existing = this.items.find(
            (item) => item.id === id && item.title === title && item.description === description
        );

        return !existing;
    }

    async update(promotion: Partial<Promotion>) {
        if (!promotion.id) return null;

        const index = this.items.findIndex((item) => item.id === promotion.id);

        if (index === -1) return null;

        const updated = {
            ...this.items[index],
            ...promotion,
            updated_at: new Date(),
        };

        this.items[index] = updated;

        return updated;
    }


    async delete(id: number) {
        this.items = this.items.filter((item) => item.id !== id);
    }


    async create(data: Prisma.PromotionCreateInput) {
        if (!data.channel_origin || !("connect" in data.channel_origin) || !data.channel_origin.connect?.id) {
            throw new Error("channel_origin with a valid channelId is required.");
        }

        const promotion: Promotion = {
            id: randomInt(1000),
            original_message: data.original_message,
            title: data.title ?? null,
            description: data.description ?? null,
            old_price: data.old_price ?? null,
            new_price: data.new_price ?? null,
            link: data.link ?? null,
            image: data.image ?? null,
            categories: Array.isArray(data.categories)
                ? data.categories
                : data.categories?.set ?? [],
            created_at: new Date(),
            updated_at: new Date(),
            send_date: null,
            channelId: data.channel_origin.connect.id,
        };

        this.items.push(promotion);

        return promotion;
    }

    async send(id: number) {
        const promotionIndex = this.items.findIndex((item) => item.id === id);

        if (promotionIndex === -1) {
            throw new Error(`Promotion with id ${id} not found.`);
        }

        const updatedPromotion = {
            ...this.items[promotionIndex],
            send_date: new Date(),
            updated_at: new Date(),
        };

        this.items[promotionIndex] = updatedPromotion;

        return updatedPromotion;
    }

    async searchMany(query: string, page: number) {
        return this.items.filter((item) => {
            const fields = [
                item.original_message ?? "",
                item.title ?? "",
                item.description ?? "",
            ].map((field) => field.toLowerCase());

            return fields.some((field) => field.includes(query.toLowerCase()));
        }).slice((page - 1) * 20, page * 20);
    }

}
