import { Channel, Prisma } from "@/generated/prisma";

export interface ChannelsRepository {
    get(): Promise<Channel[] | null>;
    create(data: Prisma.ChannelCreateInput): Promise<Channel>;
    update(data: Prisma.ChannelUncheckedUpdateInput): Promise<Channel>;
    delete(id: number): Promise<void>;
    searchManyByName(query: string): Promise<Channel[] | null>;
}
