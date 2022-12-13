/*
  Warnings:

  - Changed the type of `uuid` on the `projects` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `uuid` on the `techs` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL;

-- AlterTable
ALTER TABLE "techs" DROP COLUMN "uuid",
ADD COLUMN     "uuid" UUID NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "projects_uuid_key" ON "projects"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "techs_uuid_key" ON "techs"("uuid");
