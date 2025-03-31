/*
  Warnings:

  - Made the column `details` on table `SubscriptionPlan` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SubscriptionPlan" ALTER COLUMN "details" SET NOT NULL;
