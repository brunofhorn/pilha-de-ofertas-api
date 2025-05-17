import { Channel, Prisma } from "@/generated/prisma";
import { ChannelsRepository } from "../channels-repository";
import { randomInt } from "node:crypto";

export class InMemoryChannelsRepository implements ChannelsRepository {
    public items: Channel[] = [];

    async get() {
        return this.items;
    }

    async searchManyByName(query: string) {
        return this.items
            .filter((item) => item.name.includes(query));
    }

    async create({ name, category }: Prisma.ChannelCreateInput) {
        const channel = {
            id: randomInt(1000),
            name: name,
            category: category,
            created_at: new Date(),
        };

        this.items.push(channel);

        return channel;
    }

    async update(channel: Channel) {
        const channelIndex = this.items.findIndex((item) => item.id === channel.id);

        if (channelIndex >= 0) {
            this.items[channelIndex] = channel;
        }

        return channel;
    }

    async delete(id: number) {
        const index = this.items.findIndex(item => item.id === id);

        if (index === -1) {
            throw new Error(`Channel with id ${id} not found.`);
        }

        this.items.splice(index, 1);
    }
}
