/*
  Warnings:

  - Made the column `created_at` on table `channels` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `promotions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `promotions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `created_at` on table `sessions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updated_at` on table `sessions` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "channels" ALTER COLUMN "created_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "promotions" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "created_at" SET NOT NULL,
ALTER COLUMN "updated_at" SET NOT NULL;
