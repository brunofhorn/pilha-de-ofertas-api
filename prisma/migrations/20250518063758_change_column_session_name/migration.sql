/*
  Warnings:

  - You are about to drop the column `telegram_session` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `whatsapp_session` on the `sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "telegram_session",
DROP COLUMN "whatsapp_session",
ADD COLUMN     "session" TEXT;
