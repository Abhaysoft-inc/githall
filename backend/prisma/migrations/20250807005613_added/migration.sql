/*
  Warnings:

  - You are about to drop the column `isPrivate` on the `Repository` table. All the data in the column will be lost.
  - Added the required column `visibility` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Repository" DROP COLUMN "isPrivate",
ADD COLUMN     "visibility" TEXT NOT NULL;
