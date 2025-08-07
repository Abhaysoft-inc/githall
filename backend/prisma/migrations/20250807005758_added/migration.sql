/*
  Warnings:

  - Added the required column `license` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Repository" ADD COLUMN     "license" TEXT NOT NULL;
