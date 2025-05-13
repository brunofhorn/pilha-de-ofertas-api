import { Channel, Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ChannelsRepository } from "../channels-repository";

export class PrismaChannelRepository implements ChannelsRepository {
    async findByName(name: string) {
        const channel = await prisma.channel.findFirstOrThrow({
            where: {
                name: {
                    contains: name
                }
            }
        });

        if (!channel) {
            return null;
        }

        return channel;
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
}
