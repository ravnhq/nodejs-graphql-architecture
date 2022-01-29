/*
  Warnings:

  - You are about to drop the column `detail_id` on the `orders` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `details` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "orders" DROP CONSTRAINT "orders_detail_id_fkey";

-- AlterTable
ALTER TABLE "details" ADD COLUMN     "orderId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "orders" DROP COLUMN "detail_id";

-- AddForeignKey
ALTER TABLE "details" ADD CONSTRAINT "details_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
