/*
  Warnings:

  - You are about to drop the `Shipper` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Shipper";

-- CreateTable
CREATE TABLE "Courier" (
    "id" SERIAL NOT NULL,
    "summaryIntro" TEXT NOT NULL,
    "house" TEXT NOT NULL,
    "block" TEXT NOT NULL,
    "road" TEXT NOT NULL,
    "area" TEXT NOT NULL,
    "additionalAddress" TEXT,
    "photo" TEXT,
    "identification" TEXT,
    "transportation" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Courier_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Courier_userId_key" ON "Courier"("userId");

-- AddForeignKey
ALTER TABLE "Courier" ADD CONSTRAINT "Courier_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
