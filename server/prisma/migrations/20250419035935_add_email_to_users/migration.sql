/*
  Warnings:

  - The `rating` column on the `Products` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `url` on the `Users` table. All the data in the column will be lost.
  - Added the required column `email` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Products" DROP COLUMN "rating",
ADD COLUMN     "rating" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "url",
ADD COLUMN     "email" TEXT NOT NULL;
