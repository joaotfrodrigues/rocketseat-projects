/*
  Warnings:

  - You are about to drop the `ExtraService` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."ExtraService" DROP CONSTRAINT "ExtraService_call_id_fkey";

-- DropTable
DROP TABLE "public"."ExtraService";

-- CreateTable
CREATE TABLE "public"."extra_services" (
    "id" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "call_id" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "extra_services_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."extra_services" ADD CONSTRAINT "extra_services_call_id_fkey" FOREIGN KEY ("call_id") REFERENCES "public"."calls"("id") ON DELETE CASCADE ON UPDATE CASCADE;
