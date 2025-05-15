import { WhatsAppService } from "@/services/whatsapp";

interface FindGroupUseCaseRequest {
    groupName: string;
}

export class FindGroupUseCase {
    constructor(private whatsappService: WhatsAppService) {}

    async execute({ groupName }: FindGroupUseCaseRequest): Promise<string | null> {
        return await this.whatsappService.findGroupByName(groupName);
    }
}
