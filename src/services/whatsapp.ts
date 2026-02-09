import whatsapp from "whatsapp-web.js";
const { Client, LocalAuth, MessageMedia } = whatsapp;
import type { Client as WhatsAppClientType, Message } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { PromotionsRepository } from "@/repositories/promotions-repository";
import { formatMessagePromotion } from "@/utils/format-message";
import { generateLink } from "@/utils/urls/generate-url";
import { formatMessageToWhatsapp } from "@/utils/formaters/format-message-to-whatsapp";
import { formatMessageToTelegram } from "@/utils/formaters/format-message-to-telegram";
import { logError } from "@/utils/log-error";
import { Promotion } from "@/generated/prisma";
import { env } from "@/env";
import { TelegramService } from "./telegram";
import { MessageRepository } from "@/repositories/message-repository";
import { LogErrors } from "@/interfaces/log";
import { regexOnlyVoucher } from "@/utils/regext-only-voucher";

const categoryToEnvVar = {
  tech: env.WHATSAPP_TECH_GROUP_ID,
  book: env.WHATSAPP_BOOK_GROUP_ID,
  kitchen: env.WHATSAPP_KITCHEN_GROUP_ID,
  gaming: env.WHATSAPP_GAMES_GROUP_ID,
  fashion: env.WHATSAPP_FASHION_GROUP_ID,
  beauty: env.WHATSAPP_BEAUTY_GROUP_ID,
  health: env.WHATSAPP_HEALTH_GROUP_ID,
  home: env.WHATSAPP_HOME_GROUP_ID,
  baby: env.WHATSAPP_BABY_GROUP_ID,
  pet: env.WHATSAPP_PET_GROUP_ID,
  sport: env.WHATSAPP_SPORT_GROUP_ID,
  automotive: env.WHATSAPP_AUTO_GROUP_ID,
  food: env.WHATSAPP_FOOD_GROUP_ID,
  travel: env.WHATSAPP_TRAVEL_GROUP_ID,
  office: env.WHATSAPP_OFFICE_GROUP_ID,
};

export class WhatsappService {
  private client: WhatsAppClientType | null = null;
  private promotionCheckInterval: NodeJS.Timeout | null = null;

  constructor(
    private promotionsRepository: PromotionsRepository,
    private telegramService: TelegramService,
    private messageRepository: MessageRepository
  ) {}

  async startConnection() {
    if (this.client) {
      console.log(LogErrors.WHATSAPP_ALREADY_RUNNING);
      return;
    }

    this.client = new Client({
      authStrategy: new LocalAuth(),
      puppeteer: {
        headless: true,
        args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-gpu"],
      },
    });

    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });

    this.client.on("auth_failure", () => {
      console.log(LogErrors.WHATSAPP_FAIL_AUTHENTICATE);
      this.restartConnection();
    });

    this.client.on("disconnected", () => {
      console.warn(LogErrors.WHATSAPP_CLIENT_DISCONNECTED);
      setTimeout(() => this.restartConnection(), 5000);
    });

    this.client.on("ready", () => {
      console.log(LogErrors.WHATSAPP_CONNECTED);
    });

    this.client.initialize();
  }

  async stopConnection() {
    if (!this.client) {
      console.log(LogErrors.WHATSAPP_ALREADY_STOPPED);
      return;
    }

    this.client.destroy();
    this.client = null;

    if (this.promotionCheckInterval) {
      clearTimeout(this.promotionCheckInterval);
      this.promotionCheckInterval = null;
    }

    console.log(LogErrors.WHATSAPP_COMPLETELY_STOPPED);
  }

  async restartConnection() {
    if (this.client) {
      this.client.destroy();
      this.client = null;
    }

    console.log(LogErrors.WHATSAPP_RESTARTING);
    this.startConnection();
  }

  async checkAndSendNewPromotions() {
    if (!this.client) return;

    const now = new Date();
    const currentHour = now.getHours();

    if (currentHour < 7 || currentHour >= 23) {
      console.log(LogErrors.OUTSIDE_OFFICE_HOURS);
      this.scheduleNextCheck();
      return;
    }

    try {
      console.log(LogErrors.CHECK_UNSENT_PROMOS);

      const promotions = await this.promotionsRepository.getLast();

      if (!promotions) {
        console.log(LogErrors.NO_PROMOTIONS);
        this.scheduleNextCheck();
        return;
      }

      for (const promo of promotions) {
        try {
          await this.processPromotion(promo);
        } catch (error) {
          logError(`${LogErrors.ERROR_PROCESSING_PROMO} - ${promo.id}`, error);
        }
      }
    } catch (error) {
      logError(LogErrors.ERROR_CHECK_PROMOS, error);
    }

    this.scheduleNextCheck();
  }

  async prepareMessageMedia(image: string | null) {
    if (!image) return {};

    try {
      const base64Data = image.startsWith("data:")
        ? image.split(",")[1]
        : image;

      const mimeType =
        image.match(/^data:(image\/[a-z]+);base64,/)?.[1] || "image/jpeg";

      return { media: new MessageMedia(mimeType, base64Data) };
    } catch (error) {
      logError(LogErrors.ERROR_PROCESSING_IMAGE, error);
      return {};
    }
  }

  async sendMessage(
    groupId: string,
    whatsappMessage: string,
    base64File: string | null
  ) {
    if (!this.client) throw new Error(LogErrors.WHATSAPP_NOT_INITIALIZED);

    try {
      const options = await this.prepareMessageMedia(base64File);

      const message = await this.client!.sendMessage(
        groupId,
        whatsappMessage,
        options
      );

      if (message.id) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }

  private async processPromotion(promo: Promotion) {
    try {
      const promoJson = await this.messageRepository.formatMessage(
        promo.original_message
      );

      console.log(LogErrors.FORMATTED_PROMO, JSON.stringify(promoJson ?? "{}"));

      const parsedJson = JSON.parse(promoJson);

      if (
        !parsedJson ||
        typeof parsedJson !== "object" ||
        Object.keys(parsedJson).length === 0
      ) {
        console.log(LogErrors.EMPTY_JSON, promo.id);
        return;
      }

      const { title, productName, oldPrice, newPrice, link, categories } =
        parsedJson;

      const compare = await this.promotionsRepository.comparePromotion(
        promo.id,
        title,
        productName
      );

      if (compare) {
        console.log(LogErrors.SKIPPING_PROMO, promo.id);
        return;
      }

      const affiliateLink = await generateLink(
        Array.isArray(link) ? link[0] : link
      );

      if (!affiliateLink) {
        console.log(LogErrors.INVALID_LINK, promo.id);
        await this.promotionsRepository.delete(promo.id);
        return;
      }

      if (regexOnlyVoucher.test(title) || regexOnlyVoucher.test(productName)) {
        console.log(LogErrors.ONLY_VOUCHER, promo.id);
        await this.promotionsRepository.delete(promo.id);
        return;
      }

      if (![title, productName].some((v) => v?.trim())) {
        console.log(LogErrors.ONLY_IMAGE, promo.id);
        return;
      }

      const whatsappMessage = await formatMessageToWhatsapp(
        parsedJson,
        affiliateLink
      );

      if (!whatsappMessage?.trim()) {
        console.warn(LogErrors.WHATSAPP_MESSAGE_EMPTY, promo.id);
        return;
      }

      if (Array.isArray(categories) && categories.length > 0) {
        for (const cat of categories) {
          const lowerCat = cat.toLowerCase();

          if (lowerCat in categoryToEnvVar) {
            const groupId =
              categoryToEnvVar[lowerCat as keyof typeof categoryToEnvVar];

            const whatsappSent = await this.sendMessage(
              groupId,
              whatsappMessage,
              promo.image
            );

            if (whatsappSent) {
              console.log(LogErrors.WHATSAPP_SENT_CATEGORY, promo.id, cat);
            } else {
              console.log(LogErrors.WHATSAPP_NOT_SENT_CATEGORY, promo.id, cat);
            }
          } else {
            console.log(LogErrors.WHATSAPP_NO_GROUP_CATEGORY);
          }
        }
      }

      const whatsappSent = await this.sendMessage(
        env.WHATSAPP_GENERAL_GROUP_ID,
        whatsappMessage,
        promo.image
      );

      if (whatsappSent) {
        console.log(LogErrors.WHATSAPP_SENT_GENERAL_GROUP, promo.id);
      } else {
        console.log(LogErrors.WHATSAPP_NOT_SENT_GENERAL_GROUP, promo.id);
      }

      const telegramMessage = await formatMessageToTelegram(
        parsedJson,
        affiliateLink
      );

      if (telegramMessage?.trim()) {
        const sentToTelegram = await this.telegramService.sendMessage(
          env.TELEGRAM_NAME_GROUP,
          telegramMessage,
          promo.image!
        );

        if (sentToTelegram) {
          console.log(LogErrors.TELEGRAM_MESSAGE_SENT, promo.id);
        } else {
          console.log(LogErrors.TELEGRAM_MESSAGE_NOT_SENT, promo.id);
        }
      }

      try {
        await this.promotionsRepository.update({
          id: promo.id,
          title,
          description: productName,
          link,
          old_price: oldPrice,
          new_price: newPrice,
          send_date: new Date(),
          categories: categories ?? [],
        });

        console.log(LogErrors.PROMOTION_UPDATED);
      } catch (error) {
        console.log(LogErrors.ERROR_PROMO_UPDATED, promo.id);
      }
    } catch (error) {
      logError(LogErrors.ERROR_PROCESSING_PROMO + " - " + promo.id, error);
    }
  }

  private scheduleNextCheck() {
    const now = new Date();
    const currentHour = now.getHours();
    let delay = 1000 * 60 * 7; // 7 min padrão

    if (currentHour < 7 || currentHour >= 23) {
      const nextRun = new Date();
      nextRun.setHours(7, 0, 0, 0);

      if (currentHour >= 23) nextRun.setDate(nextRun.getDate() + 1);
      delay = nextRun.getTime() - now.getTime();

      console.log(LogErrors.OUT_OF_HOURS, nextRun);
    }

    this.promotionCheckInterval = setTimeout(
      () => this.checkAndSendNewPromotions(),
      delay
    );
  }
}
