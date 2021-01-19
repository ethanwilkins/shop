/*
  Warnings:

  - You are about to drop the column `productId` on the `Image` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Image" DROP COLUMN "productId";

-- AddForeignKey
ALTER TABLE "Image" ADD FOREIGN KEY("userId")REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
