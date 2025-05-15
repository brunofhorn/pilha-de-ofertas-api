export async function calculateDiscount(oldPrice: number, actualPrice: number) {
    return Math.round(((oldPrice - actualPrice) / oldPrice) * 100);
};
