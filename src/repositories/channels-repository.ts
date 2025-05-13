import { Channel, Prisma } from "@/generated/prisma";

export interface ChannelsRepository {
    searchManyByName(query: string, page: number): Promise<Channel[] | null>;
    create(data: Prisma.ChannelCreateInput): Promise<Channel>;
    update(data: Prisma.ChannelUncheckedUpdateInput): Promise<Channel>
}
