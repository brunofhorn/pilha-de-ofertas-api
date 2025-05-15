import { IPromotion } from "@/interfaces/promotion";
import { formatPriceToBrazilian } from "./format-price-to-brazilian";
import { calculateDiscount } from "../calculate-discount";

export async function formatMessageToWhatsapp(promotion: IPromotion, affiliateLink: string) {
    try {
        const { title, productName, oldPrice, newPrice, voucher } = promotion;

        let message = ``;

        if (title) {
            if (title !== productName) {
                message += `${title?.toUpperCase()}\n\n`;
            }
        }

        message += `*${productName}*\n\n`;

        if (oldPrice && newPrice) {
            if (oldPrice <= newPrice) {
                message += `Por:\n`;
                message += `🔥 *${formatPriceToBrazilian(newPrice)}* 🔥 `;
            } else {
                message += `De: ~${formatPriceToBrazilian(oldPrice)}~\n`;
                message += `Por:\n`;
                message += `🔥 *${formatPriceToBrazilian(newPrice)}* 🔥 `;

                const discount = await calculateDiscount(oldPrice, newPrice);
                if (Number.isInteger(discount) && discount >= 1 && discount <= 99) {
                    message += `(${discount}% OFF)`;
                }
            }
        } else if (oldPrice) {
            message += `Por:\n`;
            message += `🔥 *${formatPriceToBrazilian(oldPrice)}* 🔥 `;
        } else if (newPrice) {
            message += `Por:\n`;
            message += `🔥 *${formatPriceToBrazilian(newPrice)}* 🔥 `;
        }

        if (
            voucher &&
            typeof voucher === "string" &&
            !/^\d+$/.test(voucher.trim()) &&
            !voucher.includes('%') &&
            !voucher.toLowerCase().includes('r$')
        ) {
            message += `\nUse o cupom: *${voucher?.toUpperCase()}* 🎟️`;
        }

        message += `\n\n🛍️ Compre aqui: ${affiliateLink}`;
        message += `\n\n⚠️ Aproveite que a oferta é por tempo limitado!`;

        const amazonRegex = /^(https?:\/\/)?(www\.)?(amazon\.(com|com\.br|ca|co\.uk|de|es|fr|it|jp|nl|sg|com\.mx|com\.au|in)|amzn\.to)\/.+/i;

        if (amazonRegex.test(affiliateLink)) {
            message += `\n\n\n📦 Seja *Prime* e tenha acesso ao *Prime Video, promoções exclusivas e frete grátis*! O primeiro mês é gratuito: https://amzn.to/4ixQUqh`;
        }

        return message;
    } catch (error: unknown) {
        const err = error as Error;
        console.error("Erro ao expandir url:", err.message);
        return null;
    }
};
