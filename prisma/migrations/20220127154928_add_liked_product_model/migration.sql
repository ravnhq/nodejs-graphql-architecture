-- CreateTable
CREATE TABLE "liked_products" (
    "user_id" TEXT NOT NULL,
    "product_id" TEXT NOT NULL,
    "liked" BOOLEAN NOT NULL,

    CONSTRAINT "liked_products_pkey" PRIMARY KEY ("user_id","product_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "liked_products_user_id_key" ON "liked_products"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "liked_products_product_id_key" ON "liked_products"("product_id");

-- AddForeignKey
ALTER TABLE "liked_products" ADD CONSTRAINT "liked_products_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "liked_products" ADD CONSTRAINT "liked_products_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
