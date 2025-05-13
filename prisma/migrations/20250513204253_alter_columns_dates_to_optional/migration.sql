-- AlterTable
ALTER TABLE "channels" ALTER COLUMN "created_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "promotions" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;

-- AlterTable
ALTER TABLE "sessions" ALTER COLUMN "created_at" DROP NOT NULL,
ALTER COLUMN "updated_at" DROP NOT NULL;
