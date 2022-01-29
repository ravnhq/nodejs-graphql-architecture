/*
  Warnings:

  - You are about to drop the column `producto_id` on the `details` table. All the data in the column will be lost.
  - Added the required column `product_id` to the `details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "details" DROP CONSTRAINT "details_producto_id_fkey";

-- AlterTable
ALTER TABLE "details" DROP COLUMN "producto_id",
ADD COLUMN     "product_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
