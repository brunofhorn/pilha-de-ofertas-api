import { Channel, Prisma } from "@/generated/prisma";
import { ChannelsRepository } from "../channels-repository";
import { randomInt } from "node:crypto";

export class InMemoryChannelsRepository implements ChannelsRepository {
    public items: Channel[] = [];

    async create(data: Prisma.ChannelCreateInput) {
        const channel = {
            id: randomInt(1000),
            name: data.name,
            category: data.category,
            created_at: new Date(),
        };

        this.items.push(channel);

        return channel;
    }
}
