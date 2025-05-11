import { Channel, Prisma } from "@/generated/prisma";

export interface ChannelsRepository {
    create(data: Prisma.ChannelCreateInput): Promise<Channel>;
}
