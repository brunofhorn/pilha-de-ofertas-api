import { Channel, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ChannelsRepository } from "../channels-repository";

export class PrismaChannelRepository implements ChannelsRepository {
    
    async getAll() {
        const channels = await prisma.channel.findMany();

        return channels;
    }

    async searchManyByName(query: string, page: number) {
        const channels = await prisma.channel.findMany({
            where: {
                name: {
                    contains: query,
                },
            },
            take: 20,
            skip: (page - 1) * 20,
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

    async delete(id: number){
        await prisma.channel.delete({
            where: {
                id
            }
        })
    }
}
