import { Api } from "telegram/tl";

interface Group {
    name: string;
    channelId: string;
}

export const isWhitelisted = (chat: Api.TypeChat, groups: Group[]): boolean => {
    const chatUsername = (chat as Api.User | Api.Channel).username ?? "";
    const chatId = String(chat.id);

    return groups.some(
        (group) =>
            group.name === chatUsername || group.channelId === chatId
    );
};