import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["dev", "test", "production"]).default("dev"),
  PORT: z.coerce.number().default(3334),
  DATABASE_URL: z.string(),
  CHROMIUM_DATA_DIR: z.string(),
  AMAZON_ID: z.string(),
  MAGAZINE_LUIZA_ID: z.string(),
  SHOPEE_APP_ID: z.string(),
  SHOPEE_SECRET: z.string(),
  WHATSAPP_GENERAL_GROUP_ID_TEST: z.string(),
  WHATSAPP_GENERAL_GROUP_ID: z.string(),
  WHATSAPP_TECH_GROUP_ID: z.string(),
  WHATSAPP_BOOK_GROUP_ID: z.string(),
  WHATSAPP_KITCHEN_GROUP_ID: z.string(),
  WHATSAPP_GAMES_GROUP_ID: z.string(),
  WHATSAPP_FASHION_GROUP_ID: z.string(),
  WHATSAPP_BEAUTY_GROUP_ID: z.string(),
  WHATSAPP_HEALTH_GROUP_ID: z.string(),
  WHATSAPP_HOME_GROUP_ID: z.string(),
  WHATSAPP_BABY_GROUP_ID: z.string(),
  WHATSAPP_PET_GROUP_ID: z.string(),
  WHATSAPP_SPORT_GROUP_ID: z.string(),
  WHATSAPP_AUTO_GROUP_ID: z.string(),
  WHATSAPP_FOOD_GROUP_ID: z.string(),
  WHATSAPP_TRAVEL_GROUP_ID: z.string(),
  WHATSAPP_OFFICE_GROUP_ID: z.string(),
  TELEGRAM_NAME_GROUP_TEST: z.string(),
  TELEGRAM_NAME_GROUP: z.string(),
  TELEGRAM_API_ID: z.preprocess(
    (val) => Number(val),
    z.number().positive("TELEGRAM_API_ID deve ser um número positivo válido.")
  ),
  TELEGRAM_API_HASH: z.string(),
  PHONE_NUMBER: z.string(),
  PERSONAL_PHONE_NUMBER: z.string(),
  EMAIL_SENDER: z.string(),
  EMAIL_PASSWORD: z.string(),
  EMAIL_RECEIVER: z.string()
});

const _env = envSchema.safeParse(process.env);

if (_env.success === false) {
  console.error("❌ Invalid environment variables.", _env.error.format());

  throw new Error("Invalid environment variables.");
}

export const env = _env.data;
