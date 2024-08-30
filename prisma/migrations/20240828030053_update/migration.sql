/*
  Warnings:

  - You are about to drop the column `pass` on the `users` table. All the data in the column will be lost.
  - Added the required column `pass_encrypted` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "pass",
ADD COLUMN     "pass_encrypted" TEXT NOT NULL;
