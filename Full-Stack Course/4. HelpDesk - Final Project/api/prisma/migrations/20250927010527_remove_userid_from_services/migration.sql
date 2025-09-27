/*
  Warnings:

  - You are about to drop the column `user_id` on the `services` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."services" DROP CONSTRAINT "services_user_id_fkey";

-- AlterTable
ALTER TABLE "public"."services" DROP COLUMN "user_id";
