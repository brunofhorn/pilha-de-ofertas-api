import { Channel, Prisma } from "@/generated/prisma";

export interface ChannelsRepository {
    findByName(name: string): Promise<Channel | null>;
    create(data: Prisma.ChannelCreateInput): Promise<Channel>;
    update(data: Prisma.ChannelUncheckedUpdateInput): Promise<Channel>
}
