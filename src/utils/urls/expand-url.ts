import axios from "axios";
import { logError } from "../log-error";
import { LogErrors } from "@/interfaces/log";

export async function expandUrl(shortUrl: string) {
  try {
    const response = await axios.get(shortUrl, { maxRedirects: 5 });

    return response?.request?.res?.responseUrl;
  } catch (error) {
    logError(LogErrors.EXPAND_URL_ERROR + shortUrl, error);

    return null;
  }
}
