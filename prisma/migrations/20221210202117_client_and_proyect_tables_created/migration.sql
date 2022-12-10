-- CreateTable
CREATE TABLE "proyect" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL,
    "status" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "techs" (
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "tech_in_proyect" (
    "uuid" TEXT NOT NULL,
    "proyect_uuid" TEXT NOT NULL,
    "tech_uuid" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "proyect_uuid_key" ON "proyect"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "techs_uuid_key" ON "techs"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "tech_in_proyect_uuid_key" ON "tech_in_proyect"("uuid");

-- AddForeignKey
ALTER TABLE "tech_in_proyect" ADD CONSTRAINT "tech_in_proyect_proyect_uuid_fkey" FOREIGN KEY ("proyect_uuid") REFERENCES "proyect"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tech_in_proyect" ADD CONSTRAINT "tech_in_proyect_tech_uuid_fkey" FOREIGN KEY ("tech_uuid") REFERENCES "techs"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
