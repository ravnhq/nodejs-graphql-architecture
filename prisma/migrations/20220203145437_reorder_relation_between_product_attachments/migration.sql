/*
  Warnings:

  - You are about to drop the column `attachment_id` on the `products` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `attachments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `attachments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "products" DROP CONSTRAINT "products_attachment_id_fkey";

-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "productId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "products" DROP COLUMN "attachment_id";

-- CreateIndex
CREATE UNIQUE INDEX "attachments_productId_key" ON "attachments"("productId");

-- AddForeignKey
ALTER TABLE "attachments" ADD CONSTRAINT "attachments_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
