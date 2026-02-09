import { env } from "@/env";
import { logError } from "../log-error";
import { LogErrors } from "@/interfaces/log";

export async function generateMagazineLuizaUrl(url: string) {
  try {
    const regex = /(magazinevoce\.com\.br)\/[^\/]+\//;
    return url.replace(regex, `$1/${env.MAGAZINE_LUIZA_ID}/`);
  } catch (error) {
    logError(LogErrors.NO_AFFILIATE_LINK + url, error);
    return null;
  }
}
