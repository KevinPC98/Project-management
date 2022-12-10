/*
  Warnings:

  - Changed the type of `uuid` on the `proyect` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uuid` on the `tech_in_proyect` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uuid` on the `techs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "proyect" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "tech_in_proyect" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "techs" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "proyect_uuid_key" ON "proyect"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_in_proyect_uuid_key" ON "tech_in_proyect"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "techs_uuid_key" ON "techs"("uuid");
