/*
  Warnings:

  - Added the required column `quantity` to the `car_details` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "car_details" ADD COLUMN     "quantity" INTEGER NOT NULL;
