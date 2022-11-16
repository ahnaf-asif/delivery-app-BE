-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "logoImgUrl" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Shipper" ALTER COLUMN "photo" DROP NOT NULL,
ALTER COLUMN "identification" DROP NOT NULL;
