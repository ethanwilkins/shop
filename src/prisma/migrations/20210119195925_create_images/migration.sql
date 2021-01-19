-- CreateTable
CREATE TABLE "Image" (
"id" SERIAL,
    "userId" INTEGER NOT NULL,
    "productId" INTEGER NOT NULL,
    "path" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    PRIMARY KEY ("id")
);
