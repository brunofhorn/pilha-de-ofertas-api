import { Prisma } from "@/generated/prisma";
import { prisma } from "@/lib/prisma";
import { ChannelsRepository } from "../channels-repository";

export class PrismaChannelRepository implements ChannelsRepository {
    async create(data: Prisma.ChannelCreateInput) {
        const channel = await prisma.channel.create({
            data
        })

        return channel
    }
}
