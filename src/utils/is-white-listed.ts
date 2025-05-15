import { Channel } from "@/generated/prisma";
import { Api } from "telegram/tl";

export const isWhitelisted = (chat: Api.TypeChat, channels: Channel[]): boolean => {
    const chatUsername = (chat as Api.User | Api.Channel).username ?? "";
    const chatId = String(chat.id);

    return channels.some(
        (channels) =>
            channels.name === chatUsername || channels.name === chatId
    );
};