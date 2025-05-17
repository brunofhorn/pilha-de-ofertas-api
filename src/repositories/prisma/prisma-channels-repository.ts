import { Channel, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ChannelsRepository } from "../channels-repository";

export class PrismaChannelRepository implements ChannelsRepository {
    async get() {
        const channels = await prisma.channel.findMany({
            orderBy: { created_at: "desc" },
        });

        return channels;
    }

    async searchManyByName(query: string) {
        const channels = await prisma.channel.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
        });

        return channels;
    }

    async create(data: Prisma.ChannelCreateInput) {
        const channel = await prisma.channel.create({
            data
        });

        return channel;
    }

    async update(data: Channel) {
        const channel = await prisma.channel.update({
            where: {
                id: data.id
            },
            data
        });

        return channel;
    }

    async delete(id: number): Promise<void> {
        const channel = await prisma.channel.findUnique({ where: { id } });

        if (!channel) {
            throw new Error(`Channel with id ${id} not found.`);
        }

        await prisma.channel.delete({ where: { id } });
    }
}
