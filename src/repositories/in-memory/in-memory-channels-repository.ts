import { Channel, Prisma } from "@/generated/prisma";
import { ChannelsRepository } from "../channels-repository";
import { randomInt } from "node:crypto";

export class InMemoryChannelsRepository implements ChannelsRepository {
    public items: Channel[] = [];

    async findByName(name: string) {
        const channel = this.items.find((item) => item.name.includes(name));

        if (!channel) {
            return null;
        }

        return channel;
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
}
