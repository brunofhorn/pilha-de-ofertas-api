-- CreateTable
CREATE TABLE "Sessions" (
    "id" SERIAL NOT NULL,
    "telegram_session" TEXT,
    "whatsapp_session" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Sessions_pkey" PRIMARY KEY ("id")
);
