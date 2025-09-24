/*
  Warnings:

  - The values [pending,opened,closed] on the enum `ServiceStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `deleted_at` on the `calls` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `extra_services` table. All the data in the column will be lost.
  - You are about to drop the column `deleted_at` on the `services` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."CallStatus" AS ENUM ('pending', 'opened', 'closed');

-- AlterEnum
BEGIN;
CREATE TYPE "public"."ServiceStatus_new" AS ENUM ('active', 'inactive');
ALTER TABLE "public"."services" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "public"."services" ALTER COLUMN "status" TYPE "public"."ServiceStatus_new" USING ("status"::text::"public"."ServiceStatus_new");
ALTER TYPE "public"."ServiceStatus" RENAME TO "ServiceStatus_old";
ALTER TYPE "public"."ServiceStatus_new" RENAME TO "ServiceStatus";
DROP TYPE "public"."ServiceStatus_old";
ALTER TABLE "public"."services" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;

-- AlterTable
ALTER TABLE "public"."calls" DROP COLUMN "deleted_at",
ADD COLUMN     "status" "public"."CallStatus" NOT NULL DEFAULT 'pending';

-- AlterTable
ALTER TABLE "public"."extra_services" DROP COLUMN "deleted_at";

-- AlterTable
ALTER TABLE "public"."services" DROP COLUMN "deleted_at",
ALTER COLUMN "status" SET DEFAULT 'active';
